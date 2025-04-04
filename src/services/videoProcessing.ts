import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import { uploadToS3 } from './s3Service';

export class VideoProcessor {
  private apiUrl: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL || 'https://api.videoprocessing.ai';
  }

  private async downloadFromS3(key: string): Promise<Blob> {
    const response = await axios.get(`${this.apiUrl}/download/${key}`, {
      responseType: 'blob'
    });
    return response.data;
  }

  async extractAudio(videoFile: File, onProgress: (progress: number) => void): Promise<Blob> {
    try {
      // Upload do vídeo para o S3
      onProgress(10);
      const videoKey = `videos/${uuidv4()}-${videoFile.name}`;
      const s3Url = await uploadToS3(videoFile, videoKey);

      // Iniciar extração de áudio
      onProgress(40);
      const extractResponse = await axios.post(`${this.apiUrl}/extract-audio`, {
        videoUrl: s3Url,
      });

      const jobId = extractResponse.data.jobId;

      // Acompanhar progresso
      let status = 'processing';
      let lastStatusResponse;
      while (status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        lastStatusResponse = await axios.get(`${this.apiUrl}/job-status/${jobId}`);
        status = lastStatusResponse.data.status;
        onProgress(Math.min(90, 40 + (lastStatusResponse.data.progress || 0) * 0.5));
      }

      if (status === 'completed' && lastStatusResponse) {
        // Download do áudio do S3
        const audioKey = lastStatusResponse.data.audioKey;
        const audioBlob = await this.downloadFromS3(audioKey);
        onProgress(100);
        return audioBlob;
      } else {
        throw new Error('Falha na extração do áudio');
      }
    } catch (error) {
      console.error('Error extracting audio:', error);
      throw new Error('Falha ao extrair áudio do vídeo');
    }
  }

  async combineVideoWithAudio(
    videoFiles: File[],
    audioFile: File,
    onProgress: (progress: number) => void
  ): Promise<Blob> {
    try {
      // Upload dos vídeos para o S3
      onProgress(5);
      const videoUploads = videoFiles.map(async (file, index) => {
        const videoKey = `videos/${uuidv4()}-${file.name}`;
        return await uploadToS3(file, videoKey);
      });

      const videoUrls = await Promise.all(videoUploads);

      // Upload do áudio para o S3
      onProgress(30);
      const audioKey = `audio/${uuidv4()}-${audioFile.name}`;
      const audioUrl = await uploadToS3(audioFile, audioKey);

      // Iniciar processamento
      onProgress(40);
      const processResponse = await axios.post(`${this.apiUrl}/combine`, {
        videoUrls,
        audioUrl,
      });

      const jobId = processResponse.data.jobId;

      // Acompanhar progresso
      let status = 'processing';
      let lastStatusResponse;
      while (status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        lastStatusResponse = await axios.get(`${this.apiUrl}/job-status/${jobId}`);
        status = lastStatusResponse.data.status;
        onProgress(Math.min(90, 40 + (lastStatusResponse.data.progress || 0) * 0.5));
      }

      if (status === 'completed' && lastStatusResponse) {
        // Download do vídeo final do S3
        const outputKey = lastStatusResponse.data.outputKey;
        const videoBlob = await this.downloadFromS3(outputKey);
        onProgress(100);
        return videoBlob;
      } else {
        throw new Error('Falha no processamento do vídeo');
      }
    } catch (error) {
      console.error('Error combining videos with audio:', error);
      throw new Error('Falha ao combinar vídeos com áudio');
    }
  }
}

export const videoProcessor = new VideoProcessor();

export const processVideo = async (file: File) => {
  try {
    const key = `videos/${Date.now()}-${file.name}`;
    const url = await uploadToS3(file, key);
    return url;
  } catch (error) {
    console.error('Erro ao processar vídeo:', error);
    throw error;
  }
};