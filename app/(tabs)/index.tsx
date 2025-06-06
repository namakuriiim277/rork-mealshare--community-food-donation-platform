import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Filter, PlusCircle } from 'lucide-react-native';
import MapView from '@/components/MapView';
import RoleToggle from '@/components/RoleToggle';
import MealCard from '@/components/MealCard';
import RestaurantCard from '@/components/RestaurantCard';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useUserStore } from '@/store/userStore';
import { useMealsStore } from '@/store/mealsStore';
import { useRestaurantsStore } from '@/store/restaurantsStore';
import { Meal } from '@/types/meal';
import { Restaurant } from '@/types/restaurant';
import { useTranslation } from '@/hooks/useTranslation';

export default function ExploreScreen() {
  const router = useRouter();
  const { currentRole, setCurrentRole } = useUserStore();
  const { meals, fetchMeals, reserveMeal } = useMealsStore();
  const { restaurants, fetchRestaurants } = useRestaurantsStore();
  const { t } = useTranslation();
  
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchMeals(), fetchRestaurants()]);
      setLoading(false);
    };
    
    loadData();
  }, [fetchMeals, fetchRestaurants]);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchMeals(), fetchRestaurants()]);
    setRefreshing(false);
  };
  
  const handleRoleChange = (role: 'donor' | 'recipient') => {
    setCurrentRole(role);
  };
  
  const handleMealPress = (meal: Meal) => {
    router.push(`/meal/${meal.id}`);
  };
  
  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push(`/restaurant/${restaurant.id}`);
  };
  
  const handleReserveMeal = (meal: Meal) => {
    reserveMeal(meal.id);
  };
  
  const handleDonate = () => {
    router.push('/donate');
  };
  
  // Create map markers based on current role
  const mapMarkers = currentRole === 'donor'
    ? restaurants.map(r => ({
        id: r.id,
        latitude: r.latitude,
        longitude: r.longitude,
        title: r.name,
        description: r.cuisine,
      }))
    : meals
        .filter(m => m.status === 'available')
        .map(m => ({
          id: m.id,
          latitude: m.latitude,
          longitude: m.longitude,
          title: m.name,
          description: m.restaurantName,
        }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RoleToggle role={currentRole} onRoleChange={handleRoleChange} />
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>
              {currentRole === 'donor' 
                ? t('explore.searchRestaurants')
                : t('explore.searchMeals')}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <MapView 
            markers={mapMarkers}
          />
          
          <View style={styles.listHeader}>
            <Text style={typography.h3}>
              {currentRole === 'donor' 
                ? t('explore.nearbyRestaurants')
                : t('explore.availableMeals')}
            </Text>
            
            {currentRole === 'donor' && (
              <TouchableOpacity 
                style={styles.donateButton}
                onPress={handleDonate}
              >
                <PlusCircle size={18} color={colors.primary} />
                <Text style={styles.donateButtonText}>{t('explore.donate')}</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {currentRole === 'donor' ? (
            <View style={styles.listContainer}>
              {restaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onPress={handleRestaurantPress}
                />
              ))}
            </View>
          ) : (
            <View style={styles.listContainer}>
              {meals
                .filter(meal => meal.status === 'available')
                .map(meal => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onPress={handleMealPress}
                    showReserveButton
                    onReserve={handleReserveMeal}
                  />
                ))}
            </View>
          )}
        </ScrollView>
      )}
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
    paddingBottom: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchPlaceholder: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 24,
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
});