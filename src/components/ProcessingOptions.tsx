import React from 'react';
import { Settings, Share2 } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';
import Select, { SingleValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface ProcessingOptionsProps {
  onAudioChange: (audio: string) => void;
  onPlatformChange: (platform: string) => void;
  onProcessingTypeChange: (type: string) => void;
  selectedAudio: string;
  selectedPlatform: string;
  selectedProcessingType: string;
}

const audioOptions: Option[] = [
  { value: 'original', label: 'Áudio Original' },
  { value: 'music', label: 'Música de Fundo' },
  { value: 'voice', label: 'Voz Sintetizada' },
];

const platformOptions: Option[] = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
];

const processingOptions: Option[] = [
  { value: 'trim', label: 'Cortar Vídeo' },
  { value: 'merge', label: 'Juntar Vídeos' },
  { value: 'subtitle', label: 'Adicionar Legendas' },
];

export const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
  onAudioChange,
  onPlatformChange,
  onProcessingTypeChange,
  selectedAudio,
  selectedPlatform,
  selectedProcessingType,
}) => {
  const handleAudioChange = (option: SingleValue<Option>) => {
    if (option) {
      onAudioChange(option.value);
    }
  };

  const handlePlatformChange = (option: SingleValue<Option>) => {
    if (option) {
      onPlatformChange(option.value);
    }
  };

  const handleProcessingTypeChange = (option: SingleValue<Option>) => {
    if (option) {
      onProcessingTypeChange(option.value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Opções de Processamento</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duração dos Segmentos
          </label>
          <div className="flex gap-4 mt-2">
            <div>
              <span className="text-sm text-gray-500">Mínimo (segundos)</span>
              <input
                type="number"
                value={options.minDuration}
                onChange={(e) =>
                  updateOptions({ minDuration: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="3"
                max="6"
              />
            </div>
            <div>
              <span className="text-sm text-gray-500">Máximo (segundos)</span>
              <input
                type="number"
                value={options.maxDuration}
                onChange={(e) =>
                  updateOptions({ maxDuration: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="3"
                max="6"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duração Final do Vídeo (segundos)
          </label>
          <input
            type="number"
            value={options.finalDuration}
            onChange={(e) =>
              updateOptions({ finalDuration: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Áudio</label>
          <Select
            options={audioOptions}
            onChange={handleAudioChange}
            value={audioOptions.find(option => option.value === selectedAudio)}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Plataforma</label>
          <Select
            options={platformOptions}
            onChange={handlePlatformChange}
            value={platformOptions.find(option => option.value === selectedPlatform)}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Processamento</label>
          <Select
            options={processingOptions}
            onChange={handleProcessingTypeChange}
            value={processingOptions.find(option => option.value === selectedProcessingType)}
            className="mt-1"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="autoRename"
            checked={options.autoRename}
            onChange={(e) => updateOptions({ autoRename: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="autoRename" className="ml-2 text-sm text-gray-700">
            Renomear arquivos automaticamente
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProcessingOptions;