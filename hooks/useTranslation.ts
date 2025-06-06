import { useCallback } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { translations, TranslationKeys } from '@/translations';

type NestedKeyOf<T> = T extends object
  ? { [K in keyof T]: K extends string
      ? T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : K
      : never
    }[keyof T]
  : never;

type TranslationPath = NestedKeyOf<TranslationKeys>;

// Helper function to get a nested property using a dot-notation path
const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((prev, curr) => {
    return prev && prev[curr] ? prev[curr] : '';
  }, obj);
};

export const useTranslation = () => {
  const { language } = useLanguageStore();
  
  const t = useCallback((key: TranslationPath, params?: Record<string, string | number>) => {
    let value = getNestedValue(translations[language], key);
    
    // Replace parameters in the string if provided
    if (params && value) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return value || key; // Fallback to the key if translation is not found
  }, [language]);
  
  return { t, language };
};