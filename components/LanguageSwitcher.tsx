import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLanguageStore } from '@/store/languageStore';
import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/translations';
import colors from '@/constants/colors';

interface LanguageSwitcherProps {
  style?: any;
}

export default function LanguageSwitcher({ style }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'jp', label: 'JP' },
    { code: 'zh', label: '中文' },
    { code: 'es', label: 'ES' },
  ];
  
  return (
    <View style={[styles.container, style]}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            language === lang.code && styles.activeLanguageButton
          ]}
          onPress={() => setLanguage(lang.code)}
        >
          <Text 
            style={[
              styles.languageText,
              language === lang.code && styles.activeLanguageText
            ]}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 4,
    marginVertical: 8,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeLanguageButton: {
    backgroundColor: colors.background,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeLanguageText: {
    color: colors.primary,
    fontWeight: '600',
  },
});