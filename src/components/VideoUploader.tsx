import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Music } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';

export const VideoUploader: React.FC = () => {
  const addVideo = useVideoStore((state) => state.addVideo);

  const onDropVideos = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => addVideo(file, 'video'));
    },
    [addVideo]
  );

  const onDropAudio = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => addVideo(file, 'audio'));
    },
    [addVideo]
  );

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isVideoDragActive } = useDropzone({
    onDrop: onDropVideos,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv'],
    },
  });

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps, isDragActive: isAudioDragActive } = useDropzone({
    onDrop: onDropAudio,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.aac'],
      'video/*': ['.mp4', '.mov'] // Para extrair áudio de vídeos
    },
  });

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div
        {...getVideoRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isVideoDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getVideoInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg text-gray-600">
          {isVideoDragActive
            ? 'Solte os vídeos aqui...'
            : 'Arraste e solte vídeos aqui, ou clique para selecionar'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Suporta MP4, AVI, MOV, MKV, FLV, WMV
        </p>
      </div>

      <div
        {...getAudioRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isAudioDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
        }`}
      >
        <input {...getAudioInputProps()} />
        <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-lg text-gray-600">
          {isAudioDragActive
            ? 'Solte os arquivos de áudio aqui...'
            : 'Arraste arquivos para extrair áudio'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Suporta MP3, WAV, M4A, AAC ou vídeos para extração
        </p>
      </div>
    </div>
  );
};