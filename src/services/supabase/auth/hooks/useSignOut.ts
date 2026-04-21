import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ServiceError } from '../../types';
import { authAPI } from '../api';

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ServiceError>({
    mutationFn: async () => {
      const { error } = await authAPI.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
