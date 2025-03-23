import { create } from 'zustand';
import { VideoFile, ProcessingOptions } from '../types/video';
import { videoProcessor } from '../services/videoProcessing';
import { toast } from 'react-toastify';

interface VideoState {
  videos: File[];
  processingOptions: {
    minDuration: number;
    maxDuration: number;
    finalDuration: number;
    autoRename: boolean;
  };
  addVideo: (video: File) => void;
  removeVideo: (index: number) => void;
  clearVideos: () => void;
  updateProcessingOptions: (options: Partial<VideoState['processingOptions']>) => void;
  processVideos: () => Promise<void>;
  extractAudio: (video: File) => Promise<Blob>;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  processingOptions: {
    minDuration: 3,
    maxDuration: 6,
    finalDuration: 30,
    autoRename: false,
  },
  addVideo: (video) => {
    set((state) => ({
      videos: [...state.videos, video],
    }));
  },
  removeVideo: (index) => {
    set((state) => ({
      videos: state.videos.filter((_, i) => i !== index),
    }));
  },
  clearVideos: () => {
    set({ videos: [] });
  },
  updateProcessingOptions: (options) => {
    set((state) => ({
      processingOptions: {
        ...state.processingOptions,
        ...options,
      },
    }));
  },
  processVideos: async () => {
    const { videos, processingOptions } = get();
    if (videos.length === 0) return;

    try {
      const processedVideos = await Promise.all(
        videos.map((video) => videoProcessor.processVideo(video))
      );
      console.log('Vídeos processados:', processedVideos);
    } catch (error) {
      console.error('Erro ao processar vídeos:', error);
    }
  },
  extractAudio: async (video) => {
    try {
      return await videoProcessor.extractAudio(video, (progress) => {
        console.log('Progresso da extração:', progress);
      });
    } catch (error) {
      console.error('Erro ao extrair áudio:', error);
      throw error;
    }
  },
}));