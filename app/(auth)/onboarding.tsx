import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Button from '@/components/Button';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useTranslation } from '@/hooks/useTranslation';

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  
  const onboardingSteps = [
    {
      title: t('onboarding.steps.0.title'),
      description: t('onboarding.steps.0.description'),
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800',
    },
    {
      title: t('onboarding.steps.1.title'),
      description: t('onboarding.steps.1.description'),
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800',
    },
    {
      title: t('onboarding.steps.2.title'),
      description: t('onboarding.steps.2.description'),
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800',
    },
    {
      title: t('onboarding.steps.3.title'),
      description: t('onboarding.steps.3.description'),
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=800',
    },
  ];
  
  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/(auth)/register');
    }
  };
  
  const handleSkip = () => {
    router.push('/(auth)/register');
  };

  const step = onboardingSteps[currentStep];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: step.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.pagination}>
          {onboardingSteps.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot,
                index === currentStep && styles.paginationDotActive
              ]} 
            />
          ))}
        </View>
        
        <Text style={[typography.h2, styles.title]}>
          {step.title}
        </Text>
        
        <Text style={[typography.body, styles.description]}>
          {step.description}
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Button 
          title={currentStep < onboardingSteps.length - 1 ? t('onboarding.next') : t('onboarding.getStarted')}
          onPress={handleNext}
          size="large"
          style={styles.primaryButton}
        />
        
        {currentStep < onboardingSteps.length - 1 && (
          <Button 
            title={t('onboarding.skip')}
            onPress={handleSkip}
            variant="text"
            style={styles.secondaryButton}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    height: '50%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: colors.textSecondary,
    paddingHorizontal: 16,
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