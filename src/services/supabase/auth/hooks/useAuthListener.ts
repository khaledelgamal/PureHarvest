import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authAPI } from '../api';
import useAuthStore from '@/store/useAuthStore';

export const useAuthListener = () => {
  const queryClient = useQueryClient();
  const { setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      const { data } = await authAPI.getSession();
      if (data) {
        setAuth(data.user, data.accessToken);
      } else {
        clearAuth();
      }
    };

    init();

    const {
      data: { subscription },
    } = authAPI.onAuthStateChange((event, session) => {
      if (session) {
        setAuth(session.user, session.accessToken);
      } else {
        clearAuth();
      }

      if (event === 'SIGNED_OUT') {
        queryClient.clear();
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);
};
