export interface VideoFile {
  id: string;
  name: string;
  file: File;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  segments?: VideoSegment[];
  type: 'video' | 'audio';
  duration?: number;
  url?: string;
}

export interface VideoSegment {
  id: string;
  startTime: number;
  endTime: number;
  duration: number;
  outputPath: string;
}

export interface ProcessingOptions {
  minDuration: number;
  maxDuration: number;
  outputFormat: 'mp4' | 'wav';
  autoRename: boolean;
  finalDuration: number;
  selectedAudio?: string;
  socialPlatform?: 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'download';
  effects: string[];
  transitions: string[];
}

export interface SocialMediaConfig {
  platform: string;
  maxDuration: number;
  aspectRatio: string;
  recommendedFormat: string;
}

export interface VideoProcessingJob {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  result?: {
    url: string;
    duration: number;
    format: string;
  };
}