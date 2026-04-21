import useAuthStore from '@/store/useAuthStore';

export const useUser = () => {
  return useAuthStore(state => state.user);
};
