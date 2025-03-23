import axios from 'axios';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';

// Configuração do S3
const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || ''
  }
});

// Serviço de extração de áudio
export const audioExtractionService = {
  async extractAudio(videoFile: File, onProgress: (progress: number) => void): Promise<string> {
    try {
      // Upload do arquivo para o S3
      const fileKey = `uploads/videos/${uuidv4()}-${videoFile.name}`;
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: import.meta.env.VITE_AWS_BUCKET_NAME || '',
          Key: fileKey,
          Body: videoFile,
          ContentType: videoFile.type
        }
      });

      upload.on('httpUploadProgress', (progress) => {
        const percentage = Math.round((progress.loaded || 0) * 100 / (progress.total || 100));
        onProgress(percentage / 2); // Primeira metade do progresso
      });

      await upload.done();

      // Chamada para o serviço de extração de áudio
      const response = await axios.post('/api/extract-audio', {
        videoUrl: `s3://${import.meta.env.VITE_AWS_BUCKET_NAME}/${fileKey}`
      });

      onProgress(100);
      return response.data.audioUrl;
    } catch (error) {
      console.error('Error in audio extraction:', error);
      throw new Error('Falha na extração do áudio');
    }
  }
};

// Serviço de criação de vídeo
export const videoCreationService = {
  async createVideo(
    videoSegments: File[],
    audioFile: File,
    options: {
      duration: number;
      transitions: string[];
      effects: string[];
    },
    onProgress: (progress: number) => void
  ): Promise<string> {
    try {
      const uploads = videoSegments.map(async (segment, index) => {
        const fileKey = `uploads/segments/${uuidv4()}-segment-${index}.mp4`;
        const upload = new Upload({
          client: s3Client,
          params: {
            Bucket: import.meta.env.VITE_AWS_BUCKET_NAME || '',
            Key: fileKey,
            Body: segment,
            ContentType: 'video/mp4'
          }
        });

        await upload.done();
        return fileKey;
      });

      // Upload do áudio
      const audioKey = `uploads/audio/${uuidv4()}-${audioFile.name}`;
      const audioUpload = new Upload({
        client: s3Client,
        params: {
          Bucket: import.meta.env.VITE_AWS_BUCKET_NAME || '',
          Key: audioKey,
          Body: audioFile,
          ContentType: audioFile.type
        }
      });

      await audioUpload.done();
      onProgress(30);

      // Chamada para o serviço de criação de vídeo
      const segmentUrls = await Promise.all(uploads);
      const response = await axios.post('/api/create-video', {
        segments: segmentUrls.map(key => `s3://${import.meta.env.VITE_AWS_BUCKET_NAME}/${key}`),
        audioUrl: `s3://${import.meta.env.VITE_AWS_BUCKET_NAME}/${audioKey}`,
        options
      });

      // Acompanhamento do progresso do processamento
      const jobId = response.data.jobId;
      let status = 'processing';
      
      while (status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const statusResponse = await axios.get(`/api/video-status/${jobId}`);
        status = statusResponse.data.status;
        onProgress(Math.min(90, 30 + (statusResponse.data.progress || 0) * 0.6));
      }

      if (status === 'completed') {
        onProgress(100);
        return response.data.videoUrl;
      } else {
        throw new Error('Falha no processamento do vídeo');
      }
    } catch (error) {
      console.error('Error in video creation:', error);
      throw new Error('Falha na criação do vídeo');
    }
  },

  async applyEffects(
    videoUrl: string,
    effects: string[],
    onProgress: (progress: number) => void
  ): Promise<string> {
    try {
      const response = await axios.post('/api/apply-effects', {
        videoUrl,
        effects
      });

      let status = 'processing';
      while (status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const statusResponse = await axios.get(`/api/effects-status/${response.data.jobId}`);
        status = statusResponse.data.status;
        onProgress(statusResponse.data.progress || 0);
      }

      if (status === 'completed') {
        return response.data.processedVideoUrl;
      } else {
        throw new Error('Falha na aplicação dos efeitos');
      }
    } catch (error) {
      console.error('Error applying effects:', error);
      throw new Error('Falha ao aplicar efeitos no vídeo');
    }
  }
};