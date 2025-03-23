import React from 'react';
import { Settings, Share2 } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';
import type { SingleValue, StylesConfig } from 'react-select';
import Select from 'react-select';
import type { Props as SelectProps } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface ProcessingOptionsProps {
  onAudioChange: (option: Option | null) => void;
  onPlatformChange: (option: Option | null) => void;
  onProcessingTypeChange: (option: Option | null) => void;
  selectedAudio: Option | null;
  selectedPlatform: Option | null;
  selectedProcessingType: Option | null;
}

const audioOptions: Option[] = [
  { value: 'original', label: 'Áudio Original' },
  { value: 'remove', label: 'Remover Áudio' },
  { value: 'background', label: 'Música de Fundo' },
];

const platformOptions: Option[] = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
];

const processingOptions: Option[] = [
  { value: 'shorts', label: 'Shorts' },
  { value: 'reels', label: 'Reels' },
];

const selectStyles: StylesConfig<Option> = {
  control: (base: any) => ({
    ...base,
    backgroundColor: 'white',
    borderColor: '#E5E7EB',
    '&:hover': {
      borderColor: '#6366F1',
    },
  }),
  option: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    backgroundColor: isSelected ? '#6366F1' : isFocused ? '#E0E7FF' : 'white',
    color: isSelected ? 'white' : '#374151',
  }),
};

export const ProcessingOptions: React.FC<ProcessingOptionsProps> = ({
  onAudioChange,
  onPlatformChange,
  onProcessingTypeChange,
  selectedAudio,
  selectedPlatform,
  selectedProcessingType,
}) => {
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
          <label className="block text-sm font-medium text-gray-700">Opções de Áudio</label>
          <Select
            options={audioOptions}
            onChange={onAudioChange}
            value={selectedAudio}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Plataforma</label>
          <Select
            options={platformOptions}
            onChange={onPlatformChange}
            value={selectedPlatform}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Processamento</label>
          <Select
            options={processingOptions}
            onChange={onProcessingTypeChange}
            value={selectedProcessingType}
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