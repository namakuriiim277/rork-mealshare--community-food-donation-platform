import React from 'react';
import { Tabs } from 'expo-router';
import { MapPin, Gift, User, BarChart3 } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { useTranslation } from '@/hooks/useTranslation';

export default function TabLayout() {
  const { user } = useUserStore();
  const { t } = useTranslation();
  const isRestaurant = user?.role === 'restaurant';
  const isAdmin = user?.role === 'admin';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0.1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0.1,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.explore'),
          tabBarIcon: ({ color, size }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
      
      {isRestaurant ? (
        <Tabs.Screen
          name="restaurant-dashboard"
          options={{
            title: t('tabs.dashboard'),
            tabBarIcon: ({ color, size }) => (
              <BarChart3 size={size} color={color} />
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="donations"
          options={{
            title: t('tabs.donations'),
            tabBarIcon: ({ color, size }) => (
              <Gift size={size} color={color} />
            ),
          }}
        />
      )}
      
      {isAdmin && (
        <Tabs.Screen
          name="admin"
          options={{
            title: t('tabs.admin'),
            tabBarIcon: ({ color, size }) => (
              <BarChart3 size={size} color={color} />
            ),
          }}
        />
      )}
      
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}