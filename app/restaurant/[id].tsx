import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Star, Clock, Award, PlusCircle } from 'lucide-react-native';
import Card from '@/components/Card';
import Button from '@/components/Button';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useRestaurantsStore } from '@/store/restaurantsStore';
import { MenuItem } from '@/types/restaurant';
import { useTranslation } from '@/hooks/useTranslation';

export default function RestaurantDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { restaurants, getRestaurant, selectedRestaurant, loading } = useRestaurantsStore();
  const { t } = useTranslation();
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      getRestaurant(id as string);
    }
  }, [id, getRestaurant]);
  
  const restaurant = selectedRestaurant;
  
  useEffect(() => {
    if (restaurant?.menuItems.length) {
      // Set the first category as active by default
      const categories = [...new Set(restaurant.menuItems.map(item => item.category))];
      if (categories.length > 0) {
        setActiveCategory(categories[0]);
      }
    }
  }, [restaurant]);
  
  const handleDonate = (menuItem: MenuItem) => {
    // Navigate to donation confirmation
    router.push({
      pathname: '/donate',
      params: { 
        restaurantId: restaurant?.id,
        menuItemId: menuItem.id
      }
    });
  };
  
  if (loading || !restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  
  // Get unique categories
  const categories = [...new Set(restaurant.menuItems.map(item => item.category))];
  
  // Filter menu items by active category
  const filteredMenuItems = activeCategory
    ? restaurant.menuItems.filter(item => item.category === activeCategory)
    : restaurant.menuItems;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: restaurant.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        {restaurant.campaignActive && (
          <View style={styles.campaignTag}>
            <Text style={styles.campaignText}>{t('restaurant.activeCampaign')}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.header}>
        <Text style={typography.h2}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{restaurant.address}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Star size={16} color={colors.secondary} fill={colors.secondary} />
            <Text style={styles.infoText}>
              {restaurant.rating} ({restaurant.reviewCount} reviews)
            </Text>
          </View>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Award size={20} color={colors.primary} />
            <Text style={styles.statValue}>{restaurant.donationCount}</Text>
            <Text style={styles.statLabel}>{t('restaurant.donations')}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Clock size={20} color={colors.secondary} />
            <Text style={styles.statValue}>15-25</Text>
            <Text style={styles.statLabel}>{t('restaurant.minutes')}</Text>
          </View>
          
          <View style={styles.statItem}>
            <MapPin size={20} color={colors.info} />
            <Text style={styles.statValue}>{restaurant.distance}</Text>
            <Text style={styles.statLabel}>{t('common.distance')}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={typography.h3}>{t('restaurant.about')}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
      
      <View style={styles.menuContainer}>
        <View style={styles.menuHeader}>
          <Text style={typography.h3}>{t('restaurant.menu')}</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>{t('explore.viewAll')}</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.menuItemsContainer}>
          {filteredMenuItems.map(item => (
            <Card key={item.id} style={styles.menuItemCard}>
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.menuItemFooter}>
                    <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                    {item.isPopular && (
                      <View style={styles.popularTag}>
                        <Text style={styles.popularTagText}>{t('restaurant.popular')}</Text>
                      </View>
                    )}
                  </View>
                </View>
                
                <View style={styles.menuItemImageContainer}>
                  <Image 
                    source={{ uri: item.imageUrl }} 
                    style={styles.menuItemImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity 
                    style={styles.donateButton}
                    onPress={() => handleDonate(item)}
                  >
                    <PlusCircle size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </View>
      
      <View style={styles.donateContainer}>
        <Button 
          title={t('restaurant.donateFromRestaurant')}
          onPress={() => router.push({
            pathname: '/donate',
            params: { restaurantId: restaurant.id }
          })}
          size="large"
          style={styles.donateFullButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  campaignTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  campaignText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 12,
  },
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  cuisine: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  descriptionContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 24,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 8,
  },
  menuContainer: {
    padding: 16,
    paddingTop: 0,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    // Style for view all button
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  categoriesContainer: {
    paddingBottom: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeCategoryText: {
    color: colors.background,
  },
  menuItemsContainer: {
    gap: 12,
  },
  menuItemCard: {
    padding: 12,
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
  menuItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  popularTag: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  popularTagText: {
    fontSize: 10,
    color: colors.secondary,
    fontWeight: '500',
  },
  menuItemImageContainer: {
    width: 80,
    position: 'relative',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  donateButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: colors.background,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  donateContainer: {
    padding: 16,
  },
  donateFullButton: {
    width: '100%',
  },
});