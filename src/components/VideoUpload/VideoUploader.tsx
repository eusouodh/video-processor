import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiVideo, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface VideoUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
  isProcessing: boolean;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onUpload, isProcessing }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const videoFiles = acceptedFiles.filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length !== acceptedFiles.length) {
      toast.error('Por favor, selecione apenas arquivos de vídeo');
      return;
    }

    setSelectedFiles(prev => [...prev, ...videoFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    disabled: isProcessing
  });

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Por favor, selecione pelo menos um vídeo');
      return;
    }

    try {
      await onUpload(selectedFiles);
      setSelectedFiles([]);
      toast.success('Upload iniciado com sucesso!');
    } catch (error) {
      toast.error('Erro ao fazer upload dos vídeos');
      console.error('Erro no upload:', error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <FiUpload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">
          {isDragActive
            ? 'Solte os arquivos aqui...'
            : 'Arraste e solte vídeos aqui, ou clique para selecionar'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Formatos suportados: MP4, MOV, AVI, MKV
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            Vídeos Selecionados
          </h3>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FiVideo className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  disabled={isProcessing}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={isProcessing}
            className={`mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {isProcessing ? 'Processando...' : 'Iniciar Upload'}
          </button>
        </div>
      )}
    </div>
  );
}; 