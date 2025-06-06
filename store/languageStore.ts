import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as Localization from 'expo-localization';
import { Language } from '@/translations';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Helper to get the device language and map it to our supported languages
const getDeviceLanguage = (): Language => {
  const locale = Localization.locale.split('-')[0];
  
  switch (locale) {
    case 'ja':
      return 'jp';
    case 'zh':
      return 'zh';
    case 'es':
      return 'es';
    default:
      return 'en';
  }
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: getDeviceLanguage(),
      setLanguage: (language: Language) => set({ language }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);