import { create } from 'zustand';
import i18n from '../i18n';

interface LanguageState {
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: i18n.language,
  setLanguage: (language: string) => {
    i18n.changeLanguage(language);
    set({ currentLanguage: language });
  },
}));