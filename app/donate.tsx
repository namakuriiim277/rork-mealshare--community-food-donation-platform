import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { X, Clock, Award } from 'lucide-react-native';
import Button from '@/components/Button';
import Card from '@/components/Card';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useRestaurantsStore } from '@/store/restaurantsStore';
import { useMealsStore } from '@/store/mealsStore';
import { useUserStore } from '@/store/userStore';
import { MenuItem } from '@/types/restaurant';
import { Meal } from '@/types/meal';
import { useTranslation } from '@/hooks/useTranslation';

export default function DonateScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { restaurants, selectedRestaurant, getRestaurant } = useRestaurantsStore();
  const { donateMeal } = useMealsStore();
  const { addPoints, incrementDonationCount } = useUserStore();
  const { t } = useTranslation();
  
  const [restaurant, setRestaurant] = useState(selectedRestaurant);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [note, setNote] = useState('');
  const [expiryHours, setExpiryHours] = useState('4');
  const [loading, setLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [menuItemId, setMenuItemId] = useState<string | null>(null);
  
  // First useEffect to extract and store params to prevent infinite loops
  useEffect(() => {
    if (params.restaurantId) {
      setRestaurantId(params.restaurantId as string);
    }
    if (params.menuItemId) {
      setMenuItemId(params.menuItemId as string);
    }
  }, []);
  
  // Second useEffect to fetch restaurant data
  useEffect(() => {
    if (restaurantId) {
      getRestaurant(restaurantId);
    }
  }, [restaurantId, getRestaurant]);
  
  // Third useEffect to update local restaurant state when selectedRestaurant changes
  useEffect(() => {
    if (selectedRestaurant) {
      setRestaurant(selectedRestaurant);
    }
  }, [selectedRestaurant]);
  
  // Fourth useEffect to handle menu item selection
  useEffect(() => {
    if (restaurant && menuItemId) {
      const menuItem = restaurant.menuItems.find(item => item.id === menuItemId);
      if (menuItem) {
        setSelectedMenuItem(menuItem);
      }
    }
  }, [restaurant, menuItemId]);
  
  const handleSelectMenuItem = (menuItem: MenuItem) => {
    setSelectedMenuItem(menuItem);
  };
  
  const handleDonate = async () => {
    if (!restaurant || !selectedMenuItem) {
      Alert.alert(t('common.error'), 'Please select a restaurant and menu item');
      return;
    }
    
    setLoading(true);
    
    try {
      // Calculate points based on price
      const points = Math.round(selectedMenuItem.price * 5);
      
      // Create meal object
      const meal: Meal = {
        id: `meal-${Date.now()}`,
        name: selectedMenuItem.name,
        description: selectedMenuItem.description,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        imageUrl: selectedMenuItem.imageUrl,
        price: selectedMenuItem.price,
        points,
        distance: restaurant.distance,
        expiresIn: `${expiryHours} ${t('donate.hours')}`,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        isSponsored: false,
        status: 'available', // Properly typed as a literal
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + parseInt(expiryHours) * 3600000).toISOString(),
      };
      
      // Donate meal
      await donateMeal(meal);
      
      // Add points to user
      addPoints(points);
      
      // Increment donation count
      incrementDonationCount();
      
      // Show success message
      Alert.alert(
        t('common.success'),
        t('donate.donateSuccess'),
        [{ text: t('common.ok'), onPress: () => router.push('/(tabs)/donations') }]
      );
    } catch (error) {
      Alert.alert(t('common.error'), 'Failed to donate meal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Stack.Screen 
        options={{
          title: t('donate.donateAMeal'),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {restaurant ? (
          <View style={styles.restaurantContainer}>
            <Card style={styles.restaurantCard}>
              <View style={styles.restaurantHeader}>
                <Image 
                  source={{ uri: restaurant.imageUrl }} 
                  style={styles.restaurantImage}
                  resizeMode="cover"
                />
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
                  <Text style={styles.restaurantDistance}>{restaurant.distance} {t('common.distance')}</Text>
                </View>
              </View>
            </Card>
          </View>
        ) : (
          <View style={styles.selectRestaurantContainer}>
            <Text style={typography.h3}>{t('donate.selectRestaurant')}</Text>
            <Text style={styles.selectRestaurantText}>
              {t('donate.selectRestaurantDesc')}
            </Text>
            <Button 
              title={t('donate.goToMap')}
              onPress={() => router.push('/(tabs)')}
              variant="outline"
              style={styles.selectRestaurantButton}
            />
          </View>
        )}
        
        {restaurant && (
          <>
            <View style={styles.menuContainer}>
              <Text style={typography.h3}>{t('donate.selectMenuItem')}</Text>
              
              {restaurant.menuItems.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleSelectMenuItem(item)}
                  activeOpacity={0.8}
                >
                  <Card 
                    style={[
                      styles.menuItemCard,
                      selectedMenuItem?.id === item.id && styles.selectedMenuItemCard
                    ]}
                  >
                    <View style={styles.menuItemContent}>
                      <View style={styles.menuItemInfo}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        <Text style={styles.menuItemDescription} numberOfLines={2}>
                          {item.description}
                        </Text>
                        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                      </View>
                      
                      <Image 
                        source={{ uri: item.imageUrl }} 
                        style={styles.menuItemImage}
                        resizeMode="cover"
                      />
                    </View>
                    
                    {selectedMenuItem?.id === item.id && (
                      <View style={styles.selectedIndicator} />
                    )}
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.detailsContainer}>
              <Text style={typography.h3}>{t('donate.donationDetails')}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('donate.addNote')}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={t('donate.noteHint')}
                  value={note}
                  onChangeText={setNote}
                  multiline
                  numberOfLines={3}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('donate.expiryTime')}</Text>
                <View style={styles.expiryContainer}>
                  <Clock size={20} color={colors.textSecondary} />
                  <TextInput
                    style={styles.expiryInput}
                    placeholder="4"
                    value={expiryHours}
                    onChangeText={setExpiryHours}
                    keyboardType="number-pad"
                  />
                  <Text style={styles.expiryText}>{t('donate.hours')}</Text>
                </View>
              </View>
              
              {selectedMenuItem && (
                <Card style={styles.pointsCard}>
                  <View style={styles.pointsContent}>
                    <Award size={24} color={colors.secondary} />
                    <View style={styles.pointsInfo}>
                      <Text style={styles.pointsTitle}>{t('donate.pointsEarn')}</Text>
                      <Text style={styles.pointsValue}>
                        {Math.round(selectedMenuItem.price * 5)} {t('donate.points')}
                      </Text>
                    </View>
                  </View>
                </Card>
              )}
            </View>
          </>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title={t('donate.donateMeal')}
          onPress={handleDonate}
          size="large"
          style={styles.donateButton}
          disabled={!restaurant || !selectedMenuItem}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  restaurantContainer: {
    marginBottom: 24,
  },
  restaurantCard: {
    padding: 12,
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  restaurantDistance: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  selectRestaurantContainer: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 24,
  },
  selectRestaurantText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  selectRestaurantButton: {
    width: '100%',
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuItemCard: {
    padding: 12,
    marginTop: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  selectedMenuItemCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 12,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  menuItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: 'transparent',
    borderTopColor: colors.primary,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  expiryInput: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  expiryText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  pointsCard: {
    marginTop: 24,
    padding: 16,
  },
  pointsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  pointsInfo: {
    flex: 1,
  },
  pointsTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  donateButton: {
    width: '100%',
  },
});