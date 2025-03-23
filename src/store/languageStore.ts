import { create } from 'zustand';
import i18n from '../i18n';

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'pt-BR',
  setLanguage: (language) => set({ language }),
}));