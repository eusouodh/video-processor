import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginProps {
  onLogin: () => void;
  isLoading: boolean;
}

export const GoogleLogin: React.FC<GoogleLoginProps> = ({ onLogin, isLoading }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Video Processing System
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          Faça login com sua conta Google para começar a processar seus vídeos
        </p>

        <button
          onClick={onLogin}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FcGoogle className="w-6 h-6" />
          <span>{isLoading ? 'Conectando...' : 'Continuar com Google'}</span>
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Ao fazer login, você concorda com nossos{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}; 