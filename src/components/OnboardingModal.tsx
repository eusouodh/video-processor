import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Facebook, BookText as TikTok, ChevronRight, Check } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  content: React.ReactNode;
}

export const OnboardingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      title: "Bem-vindo ao Video Processing AI",
      description: "Vamos configurar sua conta em poucos passos",
      content: (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Comece a criar conteúdo viral</h3>
          <p className="text-gray-600 mb-8">
            Nossa plataforma vai ajudar você a criar e gerenciar conteúdo para todas as suas redes sociais.
          </p>
          <img
            src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Video Processing"
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      )
    },
    {
      title: "Conecte suas redes sociais",
      description: "Integre suas contas para publicação automática",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Youtube className="w-6 h-6" />, name: "YouTube" },
            { icon: <Instagram className="w-6 h-6" />, name: "Instagram" },
            { icon: <Facebook className="w-6 h-6" />, name: "Facebook" },
            { icon: <TikTok className="w-6 h-6" />, name: "TikTok" }
          ].map((platform) => (
            <button
              key={platform.name}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
            >
              {platform.icon}
              <span>{platform.name}</span>
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Configure suas preferências",
      description: "Personalize sua experiência",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
            <input type="checkbox" id="autoProcess" className="w-4 h-4" />
            <label htmlFor="autoProcess">Processamento automático de vídeos</label>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
            <input type="checkbox" id="autoSchedule" className="w-4 h-4" />
            <label htmlFor="autoSchedule">Agendamento automático de posts</label>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200">
            <input type="checkbox" id="notifications" className="w-4 h-4" />
            <label htmlFor="notifications">Notificações por email</label>
          </div>
        </div>
      )
    },
    {
      title: "Pronto para começar!",
      description: "Sua conta está configurada",
      content: (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Tudo pronto!</h3>
          <p className="text-gray-600 mb-8">
            Você já pode começar a criar e gerenciar seu conteúdo.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Começar a usar
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4"
      >
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>

          <div className="mb-8">
            {steps[currentStep].content}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              className={`px-4 py-2 rounded-lg ${
                currentStep === 0 ? 'invisible' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Voltar
            </button>
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  onClose();
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                'Concluir'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};