import { create } from 'zustand';
import { Restaurant, MenuItem } from '@/types/restaurant';
import { restaurants as mockRestaurants } from '@/mocks/restaurants';

interface RestaurantsState {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
  fetchRestaurants: () => Promise<void>;
  getRestaurant: (id: string) => Promise<void>;
  addMenuItem: (restaurantId: string, menuItem: MenuItem) => Promise<void>;
  updateMenuItem: (restaurantId: string, menuItem: MenuItem) => Promise<void>;
  removeMenuItem: (restaurantId: string, menuItemId: string) => Promise<void>;
  toggleCampaign: (restaurantId: string) => Promise<void>;
}

export const useRestaurantsStore = create<RestaurantsState>((set, get) => ({
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
  
  fetchRestaurants: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      set({ 
        restaurants: mockRestaurants,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch restaurants',
        loading: false 
      });
    }
  },
  
  getRestaurant: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      const restaurant = mockRestaurants.find(r => r.id === id);
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }
      
      set({ 
        selectedRestaurant: restaurant,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to get restaurant',
        loading: false 
      });
    }
  },
  
  addMenuItem: async (restaurantId: string, menuItem: MenuItem) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      set((state) => {
        const restaurantIndex = state.restaurants.findIndex(r => r.id === restaurantId);
        if (restaurantIndex === -1) {
          throw new Error('Restaurant not found');
        }
        
        const updatedRestaurant = {
          ...state.restaurants[restaurantIndex],
          menuItems: [
            ...state.restaurants[restaurantIndex].menuItems,
            { ...menuItem, id: `menu-${Date.now()}` }
          ]
        };
        
        const updatedRestaurants = [...state.restaurants];
        updatedRestaurants[restaurantIndex] = updatedRestaurant;
        
        return { 
          restaurants: updatedRestaurants,
          selectedRestaurant: updatedRestaurant,
          loading: false 
        };
      });
    } catch (error) {
      set({ 
        error: 'Failed to add menu item',
        loading: false 
      });
    }
  },
  
  updateMenuItem: async (restaurantId: string, menuItem: MenuItem) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      set((state) => {
        const restaurantIndex = state.restaurants.findIndex(r => r.id === restaurantId);
        if (restaurantIndex === -1) {
          throw new Error('Restaurant not found');
        }
        
        const menuItemIndex = state.restaurants[restaurantIndex].menuItems.findIndex(
          m => m.id === menuItem.id
        );
        if (menuItemIndex === -1) {
          throw new Error('Menu item not found');
        }
        
        const updatedMenuItems = [...state.restaurants[restaurantIndex].menuItems];
        updatedMenuItems[menuItemIndex] = menuItem;
        
        const updatedRestaurant = {
          ...state.restaurants[restaurantIndex],
          menuItems: updatedMenuItems
        };
        
        const updatedRestaurants = [...state.restaurants];
        updatedRestaurants[restaurantIndex] = updatedRestaurant;
        
        return { 
          restaurants: updatedRestaurants,
          selectedRestaurant: updatedRestaurant,
          loading: false 
        };
      });
    } catch (error) {
      set({ 
        error: 'Failed to update menu item',
        loading: false 
      });
    }
  },
  
  removeMenuItem: async (restaurantId: string, menuItemId: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      set((state) => {
        const restaurantIndex = state.restaurants.findIndex(r => r.id === restaurantId);
        if (restaurantIndex === -1) {
          throw new Error('Restaurant not found');
        }
        
        const updatedMenuItems = state.restaurants[restaurantIndex].menuItems.filter(
          m => m.id !== menuItemId
        );
        
        const updatedRestaurant = {
          ...state.restaurants[restaurantIndex],
          menuItems: updatedMenuItems
        };
        
        const updatedRestaurants = [...state.restaurants];
        updatedRestaurants[restaurantIndex] = updatedRestaurant;
        
        return { 
          restaurants: updatedRestaurants,
          selectedRestaurant: updatedRestaurant,
          loading: false 
        };
      });
    } catch (error) {
      set({ 
        error: 'Failed to remove menu item',
        loading: false 
      });
    }
  },
  
  toggleCampaign: async (restaurantId: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      set((state) => {
        const restaurantIndex = state.restaurants.findIndex(r => r.id === restaurantId);
        if (restaurantIndex === -1) {
          throw new Error('Restaurant not found');
        }
        
        const updatedRestaurant = {
          ...state.restaurants[restaurantIndex],
          campaignActive: !state.restaurants[restaurantIndex].campaignActive
        };
        
        const updatedRestaurants = [...state.restaurants];
        updatedRestaurants[restaurantIndex] = updatedRestaurant;
        
        return { 
          restaurants: updatedRestaurants,
          selectedRestaurant: updatedRestaurant,
          loading: false 
        };
      });
    } catch (error) {
      set({ 
        error: 'Failed to toggle campaign',
        loading: false 
      });
    }
  },
}));