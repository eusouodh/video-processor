import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Scissors, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VideoUploader } from './VideoUploader';
import { ProcessingOptions } from './ProcessingOptions';
import { VideoList } from './VideoList';
import { OnboardingModal } from './OnboardingModal';
import { useAuthStore } from '../store/authStore';
import { useVideoStore } from '../store/videoStore';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { toast } from 'react-toastify';

interface VideoProcessorProps {
  onProcess?: (videoFile: File) => Promise<any[]>
  onExtractAudio?: (videoFile: File) => Promise<Blob>
}

const VideoProcessor: React.FC<VideoProcessorProps> = ({ onProcess, onExtractAudio }) => {
  const navigate = useNavigate();
  const { user, logout, hasCompletedOnboarding } = useAuthStore();
  const { videos, audioFiles, updateVideoStatus, addVideo } = useVideoStore();
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);
  const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
  const loaded = useRef(false);

  const load = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    
    if (!loaded.current) {
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
      });
      loaded.current = true;
    }
  };

  useEffect(() => {
    load();
  }, []);

  const processVideo = useCallback(async (videoFile: File) => {
    if (!ffmpegRef.current) {
      toast.error('Processador de vídeo não inicializado');
      return;
    }

    const videoId = crypto.randomUUID();
    addVideo(videoFile, 'video');

    try {
      updateVideoStatus(videoId, 'processing', 0);
      await ffmpegRef.current.writeFile('input.mp4', await fetchFile(videoFile));

      // Cortar o vídeo em segmentos
      await ffmpegRef.current.exec([
        '-i', 'input.mp4',
        '-c', 'copy',
        '-segment_time', '5',
        '-f', 'segment',
        'output_%03d.mp4'
      ]);

      // Ler os segmentos
      const segments = [];
      let i = 0;
      while (true) {
        try {
          updateVideoStatus(videoId, 'processing', Math.min((i + 1) * 20, 90));
          const data = await ffmpegRef.current.readFile(`output_${String(i).padStart(3, '0')}.mp4`);
          segments.push(new Blob([data], { type: 'video/mp4' }));
          i++;
        } catch {
          break;
        }
      }

      updateVideoStatus(videoId, 'completed', 100);
      return segments;
    } catch (error) {
      console.error('Error processing video:', error);
      updateVideoStatus(videoId, 'error', 0);
      toast.error('Erro ao processar o vídeo');
      throw error;
    }
  }, [ffmpegRef, addVideo, updateVideoStatus]);

  const extractAudio = useCallback(async (videoFile: File) => {
    if (!ffmpegRef.current) {
      toast.error('Processador de vídeo não inicializado');
      return;
    }

    const audioId = crypto.randomUUID();
    addVideo(videoFile, 'audio');

    try {
      updateVideoStatus(audioId, 'processing', 0);
      await ffmpegRef.current.writeFile('input.mp4', await fetchFile(videoFile));

      // Extrair áudio
      await ffmpegRef.current.exec([
        '-i', 'input.mp4',
        '-vn', '-acodec', 'copy',
        'output.aac'
      ]);

      updateVideoStatus(audioId, 'processing', 50);
      const data = await ffmpegRef.current.readFile('output.aac');
      const audioBlob = new Blob([data], { type: 'audio/aac' });

      updateVideoStatus(audioId, 'completed', 100);
      return audioBlob;
    } catch (error) {
      console.error('Error extracting audio:', error);
      updateVideoStatus(audioId, 'error', 0);
      toast.error('Erro ao extrair o áudio');
      throw error;
    }
  }, [ffmpegRef, addVideo, updateVideoStatus]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-gray-900">Video Processing AI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Olá, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <VideoUploader onProcess={processVideo} onExtractAudio={extractAudio} />
          <ProcessingOptions />
          <VideoList />
        </div>
      </div>
    </div>
  );
};

export default VideoProcessor;