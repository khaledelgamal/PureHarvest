import { useMutation } from '@tanstack/react-query';
import type { ServiceError } from '../../types';
import { authAPI } from '../api';

export const useSignOut = () => {
  return useMutation<void, ServiceError>({
    mutationFn: async () => {
      const { error } = await authAPI.signOut();

      if (error) throw error;
    },
  });
};
