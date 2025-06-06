import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useTranslation } from '@/hooks/useTranslation';

// This is a placeholder for the actual map implementation
// In a real app, you would use react-native-maps or a similar library

interface MapViewProps {
  userLocation?: { latitude: number; longitude: number };
  markers?: Array<{
    id: string;
    latitude: number;
    longitude: number;
    title: string;
    description?: string;
  }>;
  onMarkerPress?: (markerId: string) => void;
  onRegionChange?: (region: any) => void;
}

export default function MapView({ 
  userLocation,
  markers = [],
  onMarkerPress,
  onRegionChange
}: MapViewProps) {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <View style={styles.webMapPlaceholder}>
          <Text style={[typography.body, styles.placeholderText]}>
            Map View
          </Text>
          <Text style={[typography.bodySmall, styles.placeholderSubtext]}>
            {markers.length} {t('explore.mapLocations')}
          </Text>
          {markers.map(marker => (
            <View key={marker.id} style={styles.markerItem}>
              <Text style={typography.bodySmall}>{marker.title}</Text>
              {marker.description && (
                <Text style={typography.caption}>{marker.description}</Text>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.mapPlaceholder}>
          <Text style={[typography.body, styles.placeholderText]}>
            Map View
          </Text>
          <Text style={[typography.bodySmall, styles.placeholderSubtext]}>
            {markers.length} {t('explore.mapLocations')}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  webMapPlaceholder: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  placeholderSubtext: {
    color: colors.textSecondary,
    marginTop: 8,
  },
  markerItem: {
    marginTop: 12,
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  }
});