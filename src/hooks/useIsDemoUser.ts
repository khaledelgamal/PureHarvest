import useAuthStore from '@/store/useAuthStore';

export const useIsDemoUser = () => {
  const user = useAuthStore(state => state.user);
  return user?.email === 'test@pureharvest.com';
};
