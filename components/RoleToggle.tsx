import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Gift, ShoppingBag } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useTranslation } from '@/hooks/useTranslation';

interface RoleToggleProps {
  role: 'donor' | 'recipient';
  onRoleChange: (role: 'donor' | 'recipient') => void;
}

export default function RoleToggle({ role, onRoleChange }: RoleToggleProps) {
  const slideAnim = React.useRef(new Animated.Value(role === 'donor' ? 0 : 1)).current;
  const { t } = useTranslation();

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: role === 'donor' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [role, slideAnim]);

  const indicatorPosition = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '50%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.indicator, 
          { left: indicatorPosition, width: '50%' }
        ]} 
      />
      
      <TouchableOpacity 
        style={[styles.option, role === 'donor' && styles.activeOption]} 
        onPress={() => onRoleChange('donor')}
        activeOpacity={0.7}
      >
        <Gift 
          size={18} 
          color={role === 'donor' ? colors.primary : colors.textSecondary} 
        />
        <Text 
          style={[
            typography.body, 
            styles.optionText,
            role === 'donor' && styles.activeText
          ]}
        >
          {t('roles.donor')}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.option, role === 'recipient' && styles.activeOption]} 
        onPress={() => onRoleChange('recipient')}
        activeOpacity={0.7}
      >
        <ShoppingBag 
          size={18} 
          color={role === 'recipient' ? colors.primary : colors.textSecondary} 
        />
        <Text 
          style={[
            typography.body, 
            styles.optionText,
            role === 'recipient' && styles.activeText
          ]}
        >
          {t('roles.recipient')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 30,
    height: 48,
    position: 'relative',
    marginVertical: 16,
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.background,
    borderRadius: 30,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 1,
  },
  activeOption: {
    // Styles for active option
  },
  optionText: {
    color: colors.textSecondary,
  },
  activeText: {
    color: colors.primary,
    fontWeight: '600',
  },
});