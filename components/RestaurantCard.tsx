import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import Card from './Card';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { Restaurant } from '@/types/restaurant';
import { useTranslation } from '@/hooks/useTranslation';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

export default function RestaurantCard({ restaurant, onPress }: RestaurantCardProps) {
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(restaurant)}>
      <Card style={styles.card}>
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
        
        <View style={styles.content}>
          <Text style={[typography.h4, styles.title]} numberOfLines={1}>
            {restaurant.name}
          </Text>
          
          <Text style={[typography.bodySmall, styles.cuisine]} numberOfLines={1}>
            {restaurant.cuisine}
          </Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MapPin size={14} color={colors.textSecondary} />
              <Text style={[typography.caption, styles.infoText]} numberOfLines={1}>
                {restaurant.distance} {t('common.distance')}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Star size={14} color={colors.secondary} fill={colors.secondary} />
              <Text style={[typography.caption, styles.infoText]}>
                {restaurant.rating} ({restaurant.reviewCount})
              </Text>
            </View>
          </View>
          
          <View style={styles.footer}>
            <Text style={[typography.caption, styles.donationCount]}>
              {restaurant.donationCount} {t('restaurant.donations')}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  campaignTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  campaignText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: '500',
  },
  content: {
    padding: 12,
  },
  title: {
    marginBottom: 4,
  },
  cuisine: {
    color: colors.textSecondary,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  donationCount: {
    color: colors.primary,
    fontWeight: '500',
  },
});