import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { VideoUploader } from '../VideoUpload/VideoUploader';

interface VideoProcessorProps {
  onProcessingComplete: (outputUrl: string) => void;
}

export const VideoProcessor: React.FC<VideoProcessorProps> = ({ onProcessingComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (files: File[]) => {
    setIsProcessing(true);

    try {
      // Criar FormData com os arquivos
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`video${index + 1}`, file);
      });

      // Enviar para o backend
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload dos vídeos');
      }

      const { jobId } = await response.json();

      // Polling do status do processamento
      const checkStatus = async () => {
        const statusResponse = await fetch(`/api/videos/status/${jobId}`);
        const { status, outputUrl } = await statusResponse.json();

        if (status === 'completed') {
          setIsProcessing(false);
          onProcessingComplete(outputUrl);
          toast.success('Processamento concluído com sucesso!');
        } else if (status === 'failed') {
          setIsProcessing(false);
          toast.error('Erro no processamento dos vídeos');
        } else {
          // Continuar verificando a cada 5 segundos
          setTimeout(checkStatus, 5000);
        }
      };

      // Iniciar verificação de status
      checkStatus();
    } catch (error) {
      console.error('Erro:', error);
      setIsProcessing(false);
      toast.error('Erro ao processar os vídeos');
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Upload e Processamento de Vídeos
            </h2>
            <p className="text-gray-600 mb-6">
              Faça o upload dos seus vídeos para processamento. Suportamos diversos formatos populares.
            </p>
            
            <VideoUploader
              onUpload={handleUpload}
              isProcessing={isProcessing}
            />

            {isProcessing && (
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-full"></div>
                </div>
                <p className="text-center text-gray-600 mt-2">
                  Processando seus vídeos...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 