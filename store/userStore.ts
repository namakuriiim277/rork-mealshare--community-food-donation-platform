import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  currentRole: 'donor' | 'recipient';
  setUser: (user: User | null) => void;
  setCurrentRole: (role: 'donor' | 'recipient') => void;
  logout: () => void;
  addPoints: (points: number) => void;
  incrementDonationCount: () => void;
  incrementReceivedCount: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      currentRole: 'donor',
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setCurrentRole: (role) => set({ currentRole: role }),
      logout: () => set({ user: null, isAuthenticated: false }),
      addPoints: (points) => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            points: (state.user.points || 0) + points
          } : null
        })),
      incrementDonationCount: () => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            donationCount: (state.user.donationCount || 0) + 1
          } : null
        })),
      incrementReceivedCount: () => 
        set((state) => ({
          user: state.user ? {
            ...state.user,
            receivedCount: (state.user.receivedCount || 0) + 1
          } : null
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);