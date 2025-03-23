import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  setUser: (user: User | null) => void;
  completeOnboarding: () => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasCompletedOnboarding: false,
      setUser: (user) => set({ user }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      logout: () => set({ user: null }),
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
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);