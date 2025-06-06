import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '@/components/Button';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useUserStore } from '@/store/userStore';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  const { t } = useTranslation();

  useEffect(() => {
    // If user is already authenticated, redirect to main app
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, router]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1593113598332-cd59a93c6138?q=80&w=800' }} 
          style={styles.logoBackground}
        />
        <View style={styles.logoOverlay}>
          <Text style={styles.logoText}>{t('common.appName')}</Text>
          <Text style={styles.tagline}>{t('common.tagline')}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={[typography.h2, styles.title]}>
          {t('welcome.donateTitle')}
        </Text>
        
        <Text style={[typography.body, styles.description]}>
          {t('welcome.donateDescription')}
        </Text>
        
        <LanguageSwitcher style={styles.languageSwitcher} />
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🍽️</Text>
            </View>
            <View style={styles.featureText}>
              <Text style={typography.h4}>{t('welcome.features.donate.title')}</Text>
              <Text style={typography.bodySmall}>
                {t('welcome.features.donate.description')}
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🗺️</Text>
            </View>
            <View style={styles.featureText}>
              <Text style={typography.h4}>{t('welcome.features.find.title')}</Text>
              <Text style={typography.bodySmall}>
                {t('welcome.features.find.description')}
              </Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>⭐</Text>
            </View>
            <View style={styles.featureText}>
              <Text style={typography.h4}>{t('welcome.features.earn.title')}</Text>
              <Text style={typography.bodySmall}>
                {t('welcome.features.earn.description')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button 
          title={t('welcome.getStarted')}
          onPress={() => router.push('/(auth)/onboarding')}
          size="large"
          style={styles.primaryButton}
        />
        
        <Button 
          title={t('welcome.alreadyHaveAccount')}
          onPress={() => router.push('/(auth)/login')}
          variant="text"
          style={styles.secondaryButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoContainer: {
    height: 300,
    position: 'relative',
  },
  logoBackground: {
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.background,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    color: colors.textSecondary,
  },
  languageSwitcher: {
    marginBottom: 24,
  },
  features: {
    gap: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    flex: 1,
  },
  footer: {
    padding: 24,
    gap: 12,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
});