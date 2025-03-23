import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Facebook, BookText as TikTok } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
}

interface SocialMediaOnboardingProps {
  onClose: () => void;
}

export const SocialMediaOnboarding: React.FC<SocialMediaOnboardingProps> = ({ onClose }) => {
  const { completeOnboarding } = useAuthStore();
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'youtube', name: 'YouTube', icon: <Youtube />, connected: false },
    { id: 'instagram', name: 'Instagram', icon: <Instagram />, connected: false },
    { id: 'facebook', name: 'Facebook', icon: <Facebook />, connected: false },
    { id: 'tiktok', name: 'TikTok', icon: <TikTok />, connected: false }
  ]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [postsPerDay, setPostsPerDay] = useState<number>(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleConnect = async (platformId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPlatforms(platforms.map(p => 
        p.id === platformId ? { ...p, connected: !p.connected } : p
      ));
      
      toast.success(`Conectado com ${platforms.find(p => p.id === platformId)?.name}`);
    } catch (error) {
      toast.error('Erro ao conectar com a rede social');
    }
  };

  const handleFinish = () => {
    completeOnboarding();
    if (onClose) onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      console.log({
        startDate,
        endDate,
        postsPerDay,
        platforms: selectedPlatforms,
      });
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-6">Conecte suas Redes Sociais</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-lg border-2 transition-colors ${
                platform.connected
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-gray-600">{platform.icon}</div>
                  <span className="font-medium">{platform.name}</span>
                </div>
                <button
                  onClick={() => handleConnect(platform.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    platform.connected
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {platform.connected ? 'Conectado' : 'Conectar'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Agendamento de Posts</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data de Início</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Data de Término</label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Posts por Dia</label>
              <input
                type="number"
                min="1"
                max="10"
                value={postsPerDay}
                onChange={(e) => setPostsPerDay(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Plataformas</label>
              <div className="mt-2 space-y-2">
                {['Instagram', 'TikTok', 'YouTube'].map((platform) => (
                  <label key={platform} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() => togglePlatform(platform)}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="ml-2">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirmar
            </button>
          </form>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleFinish}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Concluir Configuração
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SocialMediaOnboarding;