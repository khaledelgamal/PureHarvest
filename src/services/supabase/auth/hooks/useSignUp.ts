import { useMutation } from '@tanstack/react-query';
import type { AuthCredentials } from '../types';
import { authAPI } from '../api';
import type { ServiceError } from '../../types';

export const useSignUp = () => {
  return useMutation<string, ServiceError, AuthCredentials>({
    mutationFn: async credentials => {
      const { data, error } = await authAPI.signUp(credentials);
      if (error) throw error;
      return data;
    },
  });
};
