import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { PlusCircle } from 'lucide-react-native';
import MealCard from '@/components/MealCard';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useMealsStore } from '@/store/mealsStore';
import { Meal } from '@/types/meal';
import { useTranslation } from '@/hooks/useTranslation';

export default function DonationsScreen() {
  const router = useRouter();
  const { meals, donatedMeals, reservedMeals, fetchMeals } = useMealsStore();
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState<'donated' | 'reserved'>('donated');
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMeals();
    setRefreshing(false);
  };
  
  const handleMealPress = (meal: Meal) => {
    router.push(`/meal/${meal.id}`);
  };
  
  const handleDonate = () => {
    router.push('/donate');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'donated' && styles.activeTab
            ]}
            onPress={() => setActiveTab('donated')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'donated' && styles.activeTabText
              ]}
            >
              {t('donations.myDonations')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'reserved' && styles.activeTab
            ]}
            onPress={() => setActiveTab('reserved')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'reserved' && styles.activeTabText
              ]}
            >
              {t('donations.reservedMeals')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.listHeader}>
          <Text style={typography.h3}>
            {activeTab === 'donated' ? t('donations.myDonations') : t('donations.reservedMeals')}
          </Text>
          
          {activeTab === 'donated' && (
            <TouchableOpacity 
              style={styles.donateButton}
              onPress={handleDonate}
            >
              <PlusCircle size={18} color={colors.primary} />
              <Text style={styles.donateButtonText}>{t('explore.donate')}</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {activeTab === 'donated' ? (
          donatedMeals.length > 0 ? (
            <View style={styles.listContainer}>
              {donatedMeals.map(meal => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onPress={handleMealPress}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>{t('donations.noDonations')}</Text>
              <Text style={styles.emptyDescription}>
                {t('donations.noDonationsDesc')}
              </Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={handleDonate}
              >
                <Text style={styles.emptyButtonText}>{t('donations.donateMeal')}</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          reservedMeals.length > 0 ? (
            <View style={styles.listContainer}>
              {reservedMeals.map(meal => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onPress={handleMealPress}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>{t('donations.noReserved')}</Text>
              <Text style={styles.emptyDescription}>
                {t('donations.noReservedDesc')}
              </Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => router.push('/(tabs)')}
              >
                <Text style={styles.emptyButtonText}>{t('donations.findMeals')}</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: colors.background,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  donateButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    gap: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
});