import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Facebook, BookText as TikTok, ChevronRight } from 'lucide-react';
import ReactDatePicker from 'react-datepicker';
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

  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);

  const handleConnect = async (platformId: string) => {
    try {
      // Simula integração com a rede social
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
          <div className="flex items-center gap-4">
            <ReactDatePicker
              selected={scheduleDate}
              onChange={(date: Date | null) => setScheduleDate(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Selecione data e hora"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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