import { create } from 'zustand';
import { Meal } from '@/types/meal';
import { meals as mockMeals } from '@/mocks/meals';

interface MealsState {
  meals: Meal[];
  donatedMeals: Meal[];
  reservedMeals: Meal[];
  loading: boolean;
  error: string | null;
  fetchMeals: () => Promise<void>;
  donateMeal: (meal: Meal) => Promise<void>;
  reserveMeal: (mealId: string) => Promise<void>;
  completeMeal: (mealId: string) => Promise<void>;
}

export const useMealsStore = create<MealsState>((set, get) => ({
  meals: [],
  donatedMeals: [],
  reservedMeals: [],
  loading: false,
  error: null,
  
  fetchMeals: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data with proper typing
      const typedMeals = mockMeals.map(meal => ({
        ...meal,
        status: meal.status as "available" | "reserved" | "completed" | "expired"
      }));
      
      set({ 
        meals: typedMeals,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch meals',
        loading: false 
      });
    }
  },
  
  donateMeal: async (meal: Meal) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      const newMeal: Meal = {
        ...meal,
        id: `donated-${Date.now()}`,
        status: 'available', // This is now properly typed
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3600000 * 4).toISOString(), // 4 hours from now
      };
      
      set((state) => ({ 
        meals: [...state.meals, newMeal],
        donatedMeals: [...state.donatedMeals, newMeal],
        loading: false 
      }));
    } catch (error) {
      set({ 
        error: 'Failed to donate meal',
        loading: false 
      });
    }
  },
  
  reserveMeal: async (mealId: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      set((state) => {
        const mealIndex = state.meals.findIndex(m => m.id === mealId);
        if (mealIndex === -1) {
          throw new Error('Meal not found');
        }
        
        const updatedMeal: Meal = {
          ...state.meals[mealIndex],
          status: 'reserved' as const, // Fix: explicitly type as literal
        };
        
        const updatedMeals = [...state.meals];
        updatedMeals[mealIndex] = updatedMeal;
        
        return { 
          meals: updatedMeals,
          reservedMeals: [...state.reservedMeals, updatedMeal],
          loading: false 
        };
      });
    } catch (error) {
      set({ 
        error: 'Failed to reserve meal',
        loading: false 
      });
    }
  },
  
  completeMeal: async (mealId: string) => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      set((state) => {
        const mealIndex = state.meals.findIndex(m => m.id === mealId);
        if (mealIndex === -1) {
          throw new Error('Meal not found');
        }
        
        const updatedMeal: Meal = {
          ...state.meals[mealIndex],
          status: 'completed' as const, // Fix: explicitly type as literal
        };
        
        const updatedMeals = [...state.meals];
        updatedMeals[mealIndex] = updatedMeal;
        
        const updatedReservedMeals = state.reservedMeals.filter(
          m => m.id !== mealId
        );
        
        return { 
          meals: updatedMeals,
          reservedMeals: updatedReservedMeals,
          loading: false 
        };
      });
    } catch (error) {
      set({ 
        error: 'Failed to complete meal',
        loading: false 
      });
    }
  },
}));