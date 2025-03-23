import React from 'react';
import { Settings, Share2 } from 'lucide-react';
import { useVideoStore } from '../store/videoStore';
import Select from 'react-select';

const socialPlatforms = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'download', label: 'Download' }
];

export const ProcessingOptions: React.FC = () => {
  const { options, updateOptions, audioFiles } = useVideoStore();

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
          <label className="block text-sm font-medium text-gray-700">
            Áudio Viral
          </label>
          <Select
            value={audioFiles.find(a => a.id === options.selectedAudio)}
            onChange={(selected) =>
              updateOptions({ selectedAudio: selected?.id })
            }
            options={audioFiles.map(audio => ({
              value: audio.id,
              label: audio.name
            }))}
            className="mt-1"
            placeholder="Selecione um áudio..."
            isClearable
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Plataforma de Destino
            </div>
          </label>
          <Select
            value={socialPlatforms.find(p => p.value === options.socialPlatform)}
            onChange={(selected) =>
              updateOptions({ socialPlatform: selected?.value as any })
            }
            options={socialPlatforms}
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