import { create } from 'zustand';
import { VideoFile, ProcessingOptions } from '../types/video';
import { videoProcessor } from '../services/videoProcessing';
import { toast } from 'react-toastify';

interface VideoStore {
  videos: VideoFile[];
  audioFiles: VideoFile[];
  options: ProcessingOptions;
  selectedVideos: string[];
  selectedAudio: string | null;
  addVideo: (file: File, type: 'video' | 'audio') => void;
  updateVideoStatus: (id: string, status: VideoFile['status'], progress: number) => void;
  updateOptions: (options: Partial<ProcessingOptions>) => void;
  removeVideo: (id: string) => void;
  toggleVideoSelection: (id: string) => void;
  setSelectedAudio: (id: string | null) => void;
  processSelectedVideos: () => Promise<void>;
  extractAudio: (videoFile: File) => Promise<void>;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  videos: [],
  audioFiles: [],
  selectedVideos: [],
  selectedAudio: null,
  options: {
    minDuration: 3,
    maxDuration: 6,
    outputFormat: 'mp4',
    autoRename: true,
    finalDuration: 60,
    socialPlatform: 'download'
  },

  addVideo: (file, type) => {
    const newFile = {
      id: crypto.randomUUID(),
      name: file.name,
      file,
      status: 'pending' as const,
      progress: 0,
      type
    };

    set((state) => ({
      videos: type === 'video' ? [...state.videos, newFile] : state.videos,
      audioFiles: type === 'audio' ? [...state.audioFiles, newFile] : state.audioFiles
    }));
  },

  updateVideoStatus: (id, status, progress) => {
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === id ? { ...video, status, progress } : video
      ),
      audioFiles: state.audioFiles.map((audio) =>
        audio.id === id ? { ...audio, status, progress } : audio
      )
    }));
  },

  updateOptions: (newOptions) => {
    set((state) => ({
      options: { ...state.options, ...newOptions },
    }));
  },

  removeVideo: (id) => {
    set((state) => ({
      videos: state.videos.filter((video) => video.id !== id),
      audioFiles: state.audioFiles.filter((audio) => audio.id !== id),
      selectedVideos: state.selectedVideos.filter(videoId => videoId !== id),
      selectedAudio: state.selectedAudio === id ? null : state.selectedAudio
    }));
  },

  toggleVideoSelection: (id) => {
    set((state) => ({
      selectedVideos: state.selectedVideos.includes(id)
        ? state.selectedVideos.filter(videoId => videoId !== id)
        : [...state.selectedVideos, id]
    }));
  },

  setSelectedAudio: (id) => {
    set({ selectedAudio: id });
  },

  processSelectedVideos: async () => {
    const { videos, audioFiles, selectedVideos, selectedAudio } = get();
    
    if (selectedVideos.length === 0 || !selectedAudio) {
      toast.error('Selecione pelo menos um vídeo e um áudio');
      return;
    }

    const selectedVideoFiles = selectedVideos
      .map(id => videos.find(v => v.id === id))
      .filter((v): v is VideoFile => v !== undefined)
      .map(v => v.file);

    const audioFile = audioFiles.find(a => a.id === selectedAudio)?.file;
    if (!audioFile) {
      toast.error('Áudio selecionado não encontrado');
      return;
    }

    try {
      await videoProcessor.initialize();
      
      const result = await videoProcessor.combineVideoWithAudio(
        selectedVideoFiles,
        audioFile,
        (progress) => {
          // Update progress for all selected videos
          selectedVideos.forEach(id => {
            get().updateVideoStatus(id, 'processing', progress);
          });
        }
      );

      // Create download link
      const url = URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'combined_video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Update status to completed
      selectedVideos.forEach(id => {
        get().updateVideoStatus(id, 'completed', 100);
      });

      toast.success('Vídeos processados com sucesso!');
    } catch (error) {
      console.error('Error processing videos:', error);
      toast.error('Erro ao processar vídeos');
      
      // Update status to error
      selectedVideos.forEach(id => {
        get().updateVideoStatus(id, 'error', 0);
      });
    }
  },

  extractAudio: async (videoFile: File) => {
    const id = crypto.randomUUID();
    get().addVideo(videoFile, 'audio');

    try {
      await videoProcessor.initialize();
      
      const result = await videoProcessor.extractAudio(
        videoFile,
        (progress) => get().updateVideoStatus(id, 'processing', progress)
      );

      // Create download link
      const url = URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      a.download = videoFile.name.replace(/\.[^/.]+$/, '.mp3');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      get().updateVideoStatus(id, 'completed', 100);
      toast.success('Áudio extraído com sucesso!');
    } catch (error) {
      console.error('Error extracting audio:', error);
      toast.error('Erro ao extrair áudio');
      get().updateVideoStatus(id, 'error', 0);
    }
  }
}));