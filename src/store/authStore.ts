import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      login: async (email: string, password: string) => {
        const user: User = {
          id: crypto.randomUUID(),
          email,
          name: email.split('@')[0],
        };
        set({ user, isAuthenticated: true });
      },
      register: async (name: string, email: string, password: string) => {
        const user: User = {
          id: crypto.randomUUID(),
          email,
          name,
        };
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);