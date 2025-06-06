import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Clock, Award, Share2 } from 'lucide-react-native';
import Card from '@/components/Card';
import Button from '@/components/Button';
import MapView from '@/components/MapView';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useMealsStore } from '@/store/mealsStore';
import { useUserStore } from '@/store/userStore';
import { Meal } from '@/types/meal';
import { useTranslation } from '@/hooks/useTranslation';

export default function MealDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { meals, reserveMeal, completeMeal } = useMealsStore();
  const { currentRole, addPoints, incrementDonationCount, incrementReceivedCount } = useUserStore();
  const { t } = useTranslation();
  
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const foundMeal = meals.find(m => m.id === id);
      setMeal(foundMeal || null);
      setLoading(false);
    }
  }, [id, meals]);
  
  const handleReserveMeal = async () => {
    if (!meal) return;
    
    try {
      await reserveMeal(meal.id);
      incrementReceivedCount();
      Alert.alert(
        t('common.success'),
        t('meal.reserveSuccess'),
        [{ text: t('common.ok'), onPress: () => router.push('/(tabs)/donations') }]
      );
    } catch (error) {
      Alert.alert(t('common.error'), 'Failed to reserve meal. Please try again.');
    }
  };
  
  const handleCompleteMeal = async () => {
    if (!meal) return;
    
    try {
      await completeMeal(meal.id);
      addPoints(meal.points);
      Alert.alert(
        t('common.success'),
        t('meal.completeSuccess', { points: meal.points }),
        [{ text: t('common.ok'), onPress: () => router.push('/(tabs)/donations') }]
      );
    } catch (error) {
      Alert.alert(t('common.error'), 'Failed to complete meal. Please try again.');
    }
  };
  
  const handleShare = () => {
    // Share functionality
    Alert.alert('Share', 'Sharing functionality would be implemented here.');
  };
  
  if (loading || !meal) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: meal.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
        {meal.isSponsored && (
          <View style={styles.sponsoredTag}>
            <Text style={styles.sponsoredText}>{t('meal.sponsored')}</Text>
          </View>
        )}
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 size={20} color={colors.background} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.header}>
        <Text style={typography.h2}>{meal.name}</Text>
        <Text style={styles.restaurant}>{meal.restaurantName}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MapPin size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{meal.distance} {t('common.distance')}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Clock size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{t('common.expiresIn')} {meal.expiresIn}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Award size={16} color={colors.secondary} />
            <Text style={[styles.infoText, { color: colors.secondary }]}>
              {meal.points} {t('common.points')}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={typography.h3}>{t('meal.description')}</Text>
        <Text style={styles.description}>{meal.description}</Text>
      </View>
      
      <View style={styles.mapContainer}>
        <Text style={[typography.h3, styles.mapTitle]}>{t('meal.location')}</Text>
        <MapView 
          markers={[{
            id: meal.id,
            latitude: meal.latitude,
            longitude: meal.longitude,
            title: meal.restaurantName,
            description: meal.name,
          }]}
        />
      </View>
      
      <View style={styles.statusContainer}>
        <Card style={styles.statusCard}>
          <Text style={styles.statusTitle}>{t('meal.status')}</Text>
          <View style={styles.statusRow}>
            <View 
              style={[
                styles.statusIndicator,
                meal.status === 'available' && styles.statusAvailable,
                meal.status === 'reserved' && styles.statusReserved,
                meal.status === 'completed' && styles.statusCompleted,
                meal.status === 'expired' && styles.statusExpired,
              ]} 
            />
            <Text style={styles.statusText}>
              {meal.status === 'available' && t('meal.statusTypes.available')}
              {meal.status === 'reserved' && t('meal.statusTypes.reserved')}
              {meal.status === 'completed' && t('meal.statusTypes.completed')}
              {meal.status === 'expired' && t('meal.statusTypes.expired')}
            </Text>
          </View>
        </Card>
      </View>
      
      <View style={styles.actionContainer}>
        {currentRole === 'recipient' && meal.status === 'available' && (
          <Button 
            title={t('meal.reserveMeal')}
            onPress={handleReserveMeal}
            size="large"
            style={styles.actionButton}
          />
        )}
        
        {currentRole === 'recipient' && meal.status === 'reserved' && (
          <Button 
            title={t('meal.completePickup')}
            onPress={handleCompleteMeal}
            size="large"
            style={styles.actionButton}
          />
        )}
        
        {currentRole === 'donor' && meal.status === 'available' && (
          <Button 
            title={t('meal.cancelDonation')}
            onPress={() => Alert.alert(t('common.cancel'), 'This would cancel your donation.')}
            variant="outline"
            size="large"
            style={styles.actionButton}
          />
        )}
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
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sponsoredTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sponsoredText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 12,
  },
  shareButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  restaurant: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  descriptionContainer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 8,
  },
  mapContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 24,
  },
  mapTitle: {
    marginBottom: 12,
  },
  statusContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 24,
  },
  statusCard: {
    padding: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  statusAvailable: {
    backgroundColor: colors.primary,
  },
  statusReserved: {
    backgroundColor: colors.secondary,
  },
  statusCompleted: {
    backgroundColor: colors.success,
  },
  statusExpired: {
    backgroundColor: colors.error,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionContainer: {
    padding: 16,
    paddingTop: 0,
  },
  actionButton: {
    width: '100%',
  },
});