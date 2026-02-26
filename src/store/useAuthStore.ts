import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/auth.types';

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),

      updateUser: data =>
        set(state => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
