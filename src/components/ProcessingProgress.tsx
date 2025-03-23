import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingProgressProps {
  progress: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  type: 'video' | 'audio';
}

export const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
  progress,
  status,
  type
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'error':
        return 'bg-red-500';
      case 'completed':
        return 'bg-green-500';
      case 'processing':
        return type === 'video' ? 'bg-blue-500' : 'bg-purple-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return type === 'video' ? 'Aguardando processamento' : 'Aguardando extração';
      case 'processing':
        return type === 'video' ? `Processando (${progress}%)` : `Extraindo áudio (${progress}%)`;
      case 'completed':
        return type === 'video' ? 'Processamento concluído' : 'Extração concluída';
      case 'error':
        return type === 'video' ? 'Erro no processamento' : 'Erro na extração';
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`absolute top-0 left-0 h-full rounded-full ${getStatusColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="mt-2 flex justify-between items-center text-sm">
        <span className="text-gray-600">{getStatusText()}</span>
        <span className="font-medium">{progress}%</span>
      </div>
    </div>
  );
};