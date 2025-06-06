import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { 
  BarChart3, 
  Users, 
  Store, 
  Gift, 
  Download,
  Search
} from 'lucide-react-native';
import Card from '@/components/Card';
import colors from '@/constants/colors';
import typography from '@/constants/typography';

export default function AdminDashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'restaurants'>('overview');
  
  const onRefresh = async () => {
    setRefreshing(true);
    // Refresh data
    setRefreshing(false);
  };
  
  const handleExportData = () => {
    // Export data as CSV
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
              activeTab === 'users' && styles.activeTab
            ]}
            onPress={() => setActiveTab('users')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'users' && styles.activeTabText
              ]}
            >
              Users
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'restaurants' && styles.activeTab
            ]}
            onPress={() => setActiveTab('restaurants')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'restaurants' && styles.activeTabText
              ]}
            >
              Restaurants
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
                    <Users size={20} color={colors.primary} />
                  </View>
                </View>
                <Text style={styles.statValue}>1,245</Text>
                <Text style={styles.statLabel}>Total Users</Text>
              </Card>
              
              <Card style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <View style={[styles.statIcon, { backgroundColor: '#FFE0B2' }]}>
                    <Store size={20} color="#FB8C00" />
                  </View>
                </View>
                <Text style={styles.statValue}>87</Text>
                <Text style={styles.statLabel}>Restaurants</Text>
              </Card>
              
              <Card style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <View style={[styles.statIcon, { backgroundColor: '#BBDEFB' }]}>
                    <Gift size={20} color="#1976D2" />
                  </View>
                </View>
                <Text style={styles.statValue}>3,892</Text>
                <Text style={styles.statLabel}>Donations</Text>
              </Card>
              
              <Card style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <View style={[styles.statIcon, { backgroundColor: '#E1BEE7' }]}>
                    <BarChart3 size={20} color="#8E24AA" />
                  </View>
                </View>
                <Text style={styles.statValue}>$12.4k</Text>
                <Text style={styles.statLabel}>Value</Text>
              </Card>
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={typography.h3}>Platform Statistics</Text>
                <TouchableOpacity 
                  style={styles.exportButton}
                  onPress={handleExportData}
                >
                  <Download size={16} color={colors.primary} />
                  <Text style={styles.exportButtonText}>Export</Text>
                </TouchableOpacity>
              </View>
              
              <Card style={styles.statsCard}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>New Users (This Week)</Text>
                  <Text style={styles.statRowValue}>+124</Text>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Active Campaigns</Text>
                  <Text style={styles.statRowValue}>32</Text>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Donations (This Month)</Text>
                  <Text style={styles.statRowValue}>876</Text>
                </View>
                
                <View style={styles.statDivider} />
                
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>App Engagement</Text>
                  <Text style={styles.statRowValue}>87%</Text>
                </View>
              </Card>
            </View>
            
            <View style={styles.section}>
              <Text style={typography.h3}>Recent Activity</Text>
              
              <Card style={styles.activityCard}>
                <View style={styles.activityItem}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>New restaurant joined</Text>
                    <Text style={styles.activityDescription}>Pasta Paradise</Text>
                    <Text style={styles.activityTime}>Today, 2:30 PM</Text>
                  </View>
                </View>
                
                <View style={styles.activityDivider} />
                
                <View style={styles.activityItem}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Campaign started</Text>
                    <Text style={styles.activityDescription}>Thai Delight</Text>
                    <Text style={styles.activityTime}>Today, 11:15 AM</Text>
                  </View>
                </View>
                
                <View style={styles.activityDivider} />
                
                <View style={styles.activityItem}>
                  <View style={styles.activityDot} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Milestone reached</Text>
                    <Text style={styles.activityDescription}>3,000 donations</Text>
                    <Text style={styles.activityTime}>Yesterday, 5:45 PM</Text>
                  </View>
                </View>
              </Card>
            </View>
          </>
        )}
        
        {activeTab === 'users' && (
          <View style={styles.section}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color={colors.textSecondary} />
                <Text style={styles.searchPlaceholder}>Search users...</Text>
              </View>
            </View>
            
            <Card style={styles.userCard}>
              <View style={styles.userHeader}>
                <Text style={styles.userName}>John Doe</Text>
                <View style={styles.userRoleTag}>
                  <Text style={styles.userRoleText}>Donor</Text>
                </View>
              </View>
              <Text style={styles.userEmail}>john.doe@example.com</Text>
              <View style={styles.userStats}>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Donations</Text>
                  <Text style={styles.userStatValue}>12</Text>
                </View>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Points</Text>
                  <Text style={styles.userStatValue}>450</Text>
                </View>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Joined</Text>
                  <Text style={styles.userStatValue}>Mar 2025</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.userCard}>
              <View style={styles.userHeader}>
                <Text style={styles.userName}>Jane Smith</Text>
                <View style={[styles.userRoleTag, { backgroundColor: '#E1BEE7' }]}>
                  <Text style={[styles.userRoleText, { color: '#8E24AA' }]}>Recipient</Text>
                </View>
              </View>
              <Text style={styles.userEmail}>jane.smith@example.com</Text>
              <View style={styles.userStats}>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Received</Text>
                  <Text style={styles.userStatValue}>8</Text>
                </View>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Points</Text>
                  <Text style={styles.userStatValue}>120</Text>
                </View>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Joined</Text>
                  <Text style={styles.userStatValue}>Apr 2025</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.userCard}>
              <View style={styles.userHeader}>
                <Text style={styles.userName}>Pizza Palace</Text>
                <View style={[styles.userRoleTag, { backgroundColor: '#FFE0B2' }]}>
                  <Text style={[styles.userRoleText, { color: '#FB8C00' }]}>Restaurant</Text>
                </View>
              </View>
              <Text style={styles.userEmail}>contact@pizzapalace.com</Text>
              <View style={styles.userStats}>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Donations</Text>
                  <Text style={styles.userStatValue}>156</Text>
                </View>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Rating</Text>
                  <Text style={styles.userStatValue}>4.7</Text>
                </View>
                <View style={styles.userStat}>
                  <Text style={styles.userStatLabel}>Joined</Text>
                  <Text style={styles.userStatValue}>Jan 2025</Text>
                </View>
              </View>
            </Card>
          </View>
        )}
        
        {activeTab === 'restaurants' && (
          <View style={styles.section}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color={colors.textSecondary} />
                <Text style={styles.searchPlaceholder}>Search restaurants...</Text>
              </View>
            </View>
            
            <Card style={styles.restaurantCard}>
              <View style={styles.restaurantHeader}>
                <Text style={styles.restaurantName}>Pizza Palace</Text>
                <View style={styles.campaignActiveTag}>
                  <Text style={styles.campaignActiveText}>Campaign Active</Text>
                </View>
              </View>
              <Text style={styles.restaurantCuisine}>Italian</Text>
              <View style={styles.restaurantStats}>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Donations</Text>
                  <Text style={styles.restaurantStatValue}>156</Text>
                </View>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Rating</Text>
                  <Text style={styles.restaurantStatValue}>4.7</Text>
                </View>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Menu Items</Text>
                  <Text style={styles.restaurantStatValue}>24</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.restaurantCard}>
              <View style={styles.restaurantHeader}>
                <Text style={styles.restaurantName}>Burrito Brothers</Text>
                <View style={[styles.campaignInactiveTag]}>
                  <Text style={styles.campaignInactiveText}>No Campaign</Text>
                </View>
              </View>
              <Text style={styles.restaurantCuisine}>Mexican</Text>
              <View style={styles.restaurantStats}>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Donations</Text>
                  <Text style={styles.restaurantStatValue}>98</Text>
                </View>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Rating</Text>
                  <Text style={styles.restaurantStatValue}>4.5</Text>
                </View>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Menu Items</Text>
                  <Text style={styles.restaurantStatValue}>18</Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.restaurantCard}>
              <View style={styles.restaurantHeader}>
                <Text style={styles.restaurantName}>Thai Delight</Text>
                <View style={styles.campaignActiveTag}>
                  <Text style={styles.campaignActiveText}>Campaign Active</Text>
                </View>
              </View>
              <Text style={styles.restaurantCuisine}>Thai</Text>
              <View style={styles.restaurantStats}>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Donations</Text>
                  <Text style={styles.restaurantStatValue}>203</Text>
                </View>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Rating</Text>
                  <Text style={styles.restaurantStatValue}>4.8</Text>
                </View>
                <View style={styles.restaurantStat}>
                  <Text style={styles.restaurantStatLabel}>Menu Items</Text>
                  <Text style={styles.restaurantStatValue}>32</Text>
                </View>
              </View>
            </Card>
          </View>
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
  statsCard: {
    padding: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statRowValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  statDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  activityCard: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 5,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityDescription: {
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  activityDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
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
  userCard: {
    marginBottom: 12,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userRoleTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  userRoleText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userStat: {
    alignItems: 'center',
  },
  userStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  userStatValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  restaurantCard: {
    marginBottom: 12,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
  },
  campaignActiveTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  campaignActiveText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  campaignInactiveTag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  campaignInactiveText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  restaurantCuisine: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  restaurantStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restaurantStat: {
    alignItems: 'center',
  },
  restaurantStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  restaurantStatValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});