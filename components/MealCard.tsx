import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Award } from 'lucide-react-native';
import Card from './Card';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { Meal } from '@/types/meal';
import { useTranslation } from '@/hooks/useTranslation';

interface MealCardProps {
  meal: Meal;
  onPress: (meal: Meal) => void;
  showReserveButton?: boolean;
  onReserve?: (meal: Meal) => void;
}

export default function MealCard({ 
  meal, 
  onPress, 
  showReserveButton = false,
  onReserve
}: MealCardProps) {
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(meal)}>
      <Card style={styles.card}>
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
        </View>
        
        <View style={styles.content}>
          <Text style={[typography.h4, styles.title]} numberOfLines={1}>
            {meal.name}
          </Text>
          
          <Text style={[typography.bodySmall, styles.restaurant]} numberOfLines={1}>
            {meal.restaurantName}
          </Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MapPin size={14} color={colors.textSecondary} />
              <Text style={[typography.caption, styles.infoText]} numberOfLines={1}>
                {meal.distance} {t('common.distance')}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Clock size={14} color={colors.textSecondary} />
              <Text style={[typography.caption, styles.infoText]}>
                {t('common.expiresIn')} {meal.expiresIn}
              </Text>
            </View>
          </View>
          
          <View style={styles.footer}>
            <View style={styles.pointsContainer}>
              <Award size={16} color={colors.secondary} />
              <Text style={styles.pointsText}>{meal.points} {t('common.points')}</Text>
            </View>
            
            {showReserveButton && onReserve && (
              <TouchableOpacity 
                style={styles.reserveButton}
                onPress={() => onReserve(meal)}
              >
                <Text style={styles.reserveButtonText}>{t('meal.reserve')}</Text>
              </TouchableOpacity>
            )}
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
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  sponsoredTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sponsoredText: {
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
  restaurant: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    color: colors.secondary,
    fontWeight: '600',
    fontSize: 14,
  },
  reserveButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
  },
  reserveButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 12,
  },
});