import { useMutation } from '@tanstack/react-query';
import type { AuthCredentials, AuthSession } from '../types';
import type { ServiceError } from '../../types';
import { authAPI } from '../api';
import useAuthStore from '@/store/useAuthStore';

export const useSignIn = () => {
  const { setAuth } = useAuthStore();

  return useMutation<AuthSession, ServiceError, AuthCredentials>({
    mutationFn: async credentials => {
      const { data, error } = await authAPI.signIn(credentials);
      if (error) throw error;
      return data;
    },
    onSuccess: session => {
      setAuth(session.user, session.accessToken);
    },
  });
};
