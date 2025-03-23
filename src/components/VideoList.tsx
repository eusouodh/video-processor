import React from 'react';
import { Video, Music, X, Share, Play, Check } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';
import { ProcessingProgress } from './ProcessingProgress';
import { toast } from 'react-toastify';

export const VideoList: React.FC = () => {
  const {
    videos,
    audioFiles,
    removeVideo,
    options,
    selectedVideos,
    selectedAudio,
    toggleVideoSelection,
    setSelectedAudio,
    processSelectedVideos
  } = useVideoStore();

  const handleShare = async () => {
    try {
      toast.success(`Vídeo compartilhado no ${options.socialPlatform}`);
    } catch (error) {
      toast.error('Erro ao compartilhar vídeo');
    }
  };

  if (videos.length === 0 && audioFiles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Lista de Vídeos */}
      {videos.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Vídeos</h3>
          <div className="space-y-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`flex items-center gap-4 p-4 border rounded-lg transition-colors ${
                  selectedVideos.includes(video.id)
                    ? 'bg-blue-50 border-blue-500'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => toggleVideoSelection(video.id)}
              >
                <div className="flex-shrink-0">
                  {selectedVideos.includes(video.id) ? (
                    <Check className="w-8 h-8 text-blue-500" />
                  ) : (
                    <Video className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{video.name}</h3>
                  <ProcessingProgress
                    progress={video.progress}
                    status={video.status}
                    type="video"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeVideo(video.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de Áudios */}
      {audioFiles.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Áudios</h3>
          <div className="space-y-4">
            {audioFiles.map((audio) => (
              <div
                key={audio.id}
                className={`flex items-center gap-4 p-4 border rounded-lg transition-colors ${
                  selectedAudio === audio.id
                    ? 'bg-purple-50 border-purple-500'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => setSelectedAudio(audio.id)}
              >
                <div className="flex-shrink-0">
                  {selectedAudio === audio.id ? (
                    <Check className="w-8 h-8 text-purple-500" />
                  ) : (
                    <Music className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{audio.name}</h3>
                  <ProcessingProgress
                    progress={audio.progress}
                    status={audio.status}
                    type="audio"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeVideo(audio.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botões de Ação */}
      {selectedVideos.length > 0 && selectedAudio && (
        <div className="flex justify-end gap-4">
          <button
            onClick={processSelectedVideos}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play className="w-5 h-5" />
            Processar Selecionados
          </button>
        </div>
      )}

      {videos.length > 0 && videos.every(v => v.status === 'completed') && (
        <div className="flex justify-end gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Share className="w-5 h-5" />
            {options.socialPlatform === 'download' ? 'Baixar Vídeo' : 'Compartilhar'}
          </button>
        </div>
      )}
    </div>
  );
};