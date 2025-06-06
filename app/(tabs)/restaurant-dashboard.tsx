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
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Download,
  PlusCircle
} from 'lucide-react-native';
import Card from '@/components/Card';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useRestaurantsStore } from '@/store/restaurantsStore';
import { useUserStore } from '@/store/userStore';

export default function RestaurantDashboardScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const { restaurants, selectedRestaurant, toggleCampaign } = useRestaurantsStore();
  
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'campaigns'>('overview');
  
  // For demo purposes, use the first restaurant as the current restaurant
  const restaurant = selectedRestaurant || restaurants[0];
  
  const onRefresh = async () => {
    setRefreshing(true);
    // Refresh data
    setRefreshing(false);
  };
  
  const handleAddMenuItem = () => {
    // Navigate to add menu item screen
  };
  
  const handleExportData = () => {
    // Export data as CSV
  };
  
  const handleToggleCampaign = () => {
    if (restaurant) {
      toggleCampaign(restaurant.id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'overview' && styles.activeTab
            ]}
            onPress={() => setActiveTab('overview')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'overview' && styles.activeTabText
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'menu' && styles.activeTab
            ]}
            onPress={() => setActiveTab('menu')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'menu' && styles.activeTabText
              ]}
            >
              Menu
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'campaigns' && styles.activeTab
            ]}
            onPress={() => setActiveTab('campaigns')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'campaigns' && styles.activeTabText
              ]}
            >
              Campaigns
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
        {activeTab === 'overview' && (
          <>
            <View style={styles.statsGrid}>
              <Card style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <View style={[styles.statIcon, { backgroundColor: colors.primaryLight }]}>
                    <Gift size={20} color={colors.primary} />
                  </View>
                </View>
                <Text style={styles.statValue}>{restaurant?.donationCount || 0}</Text>
                <Text style={styles.statLabel}>Total Donations</Text>
              </Card>
              
              <Card style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <View style={[styles.statIcon, { backgroundColor: '#FFE0B2' }]}>
                    <TrendingUp size={20} color="#FB8C00" />
                  </View>
                </View>
                <Text style={styles.statValue}>4.7</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </Card>
              
              <Card style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <View style={[styles.statIcon, { backgroundColor: '#BBDEFB' }]}>
                    <Users size={20} color="#1976D2" />
                  </View>
                </View>
                <Text style={styles.statValue}>152</Text>
                <Text style={styles.statLabel}>Customers</Text>
              </Card>
              
              <Card style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <View style={[styles.statIcon, { backgroundColor: '#E1BEE7' }]}>
                    <Calendar size={20} color="#8E24AA" />
                  </View>
                </View>
                <Text style={styles.statValue}>28</Text>
                <Text style={styles.statLabel}>This Month</Text>
              </Card>
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={typography.h3}>Recent Activity</Text>
                <TouchableOpacity 
                  style={styles.exportButton}
                  onPress={handleExportData}
                >
                  <Download size={16} color={colors.primary} />
                  <Text style={styles.exportButtonText}>Export</Text>
                </TouchableOpacity>
              </View>
              
              <Card style={styles.activityCard}>
                <View style={styles.activityItem}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Margherita Pizza donated</Text>
                    <Text style={styles.activityTime}>Today, 2:30 PM</Text>
                  </View>
                  <Text style={styles.activityPoints}>+50 pts</Text>
                </View>
                
                <View style={styles.activityDivider} />
                
                <View style={styles.activityItem}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Pepperoni Pizza donated</Text>
                    <Text style={styles.activityTime}>Today, 11:15 AM</Text>
                  </View>
                  <Text style={styles.activityPoints}>+55 pts</Text>
                </View>
                
                <View style={styles.activityDivider} />
                
                <View style={styles.activityItem}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Garlic Bread donated</Text>
                    <Text style={styles.activityTime}>Yesterday, 5:45 PM</Text>
                  </View>
                  <Text style={styles.activityPoints}>+25 pts</Text>
                </View>
              </Card>
            </View>
          </>
        )}
        
        {activeTab === 'menu' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={typography.h3}>Menu Items</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddMenuItem}
              >
                <PlusCircle size={18} color={colors.primary} />
                <Text style={styles.addButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
            
            {restaurant?.menuItems.map((item) => (
              <Card key={item.id} style={styles.menuItemCard}>
                <View style={styles.menuItemHeader}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                <View style={styles.menuItemFooter}>
                  <Text style={styles.menuItemCategory}>{item.category}</Text>
                  {item.isPopular && (
                    <View style={styles.popularTag}>
                      <Text style={styles.popularTagText}>Popular</Text>
                    </View>
                  )}
                </View>
              </Card>
            ))}
          </View>
        )}
        
        {activeTab === 'campaigns' && (
          <View style={styles.section}>
            <Card style={styles.campaignCard}>
              <Text style={styles.campaignTitle}>Donation Campaign</Text>
              <Text style={styles.campaignDescription}>
                Run a special campaign to encourage more donations from your restaurant.
                This will highlight your restaurant in the app.
              </Text>
              
              <View style={styles.campaignStatus}>
                <Text style={styles.campaignStatusText}>
                  Status: {restaurant?.campaignActive ? 'Active' : 'Inactive'}
                </Text>
                <TouchableOpacity 
                  style={[
                    styles.campaignButton,
                    restaurant?.campaignActive ? styles.stopButton : styles.startButton
                  ]}
                  onPress={handleToggleCampaign}
                >
                  <Text style={styles.campaignButtonText}>
                    {restaurant?.campaignActive ? 'Stop Campaign' : 'Start Campaign'}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
            
            <Card style={styles.campaignStatsCard}>
              <Text style={styles.campaignStatsTitle}>Campaign Statistics</Text>
              
              <View style={styles.campaignStat}>
                <Text style={styles.campaignStatLabel}>Total Campaigns</Text>
                <Text style={styles.campaignStatValue}>3</Text>
              </View>
              
              <View style={styles.campaignStat}>
                <Text style={styles.campaignStatLabel}>Donations During Campaigns</Text>
                <Text style={styles.campaignStatValue}>87</Text>
              </View>
              
              <View style={styles.campaignStat}>
                <Text style={styles.campaignStatLabel}>Average Increase in Donations</Text>
                <Text style={styles.campaignStatValue}>+32%</Text>
              </View>
            </Card>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Import the Gift icon at the top of the file
import { Gift } from 'lucide-react-native';

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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    padding: 16,
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exportButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  activityCard: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  activityPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
  },
  activityDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  menuItemCard: {
    marginBottom: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  menuItemDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemCategory: {
    fontSize: 12,
    color: colors.textSecondary,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  popularTag: {
    backgroundColor: colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  popularTagText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '500',
  },
  campaignCard: {
    marginBottom: 16,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  campaignDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  campaignStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignStatusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  campaignButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: colors.primary,
  },
  stopButton: {
    backgroundColor: colors.error,
  },
  campaignButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 14,
  },
  campaignStatsCard: {
    marginBottom: 16,
  },
  campaignStatsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  campaignStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  campaignStatLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  campaignStatValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});