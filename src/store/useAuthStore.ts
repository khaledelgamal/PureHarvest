import { create } from 'zustand';
import type { User } from '@/types/auth.types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
  user: null,
  token: null,
  isLoading: true,

  setAuth: (user, token) => set({ user, token, isLoading: false }),
  clearAuth: () => set({ user: null, token: null, isLoading: false }),
  updateUser: data =>
    set(state => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),

  logout: () => set({ user: null, token: null }),

  setLoading: isLoading => set({ isLoading }),
}));

export default useAuthStore;
