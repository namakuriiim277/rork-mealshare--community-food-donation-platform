import en from './en';
import jp from './jp';
import zh from './zh';
import es from './es';

export type Language = 'en' | 'jp' | 'zh' | 'es';

export const translations = {
  en,
  jp,
  zh,
  es,
};

export type TranslationKeys = typeof en;