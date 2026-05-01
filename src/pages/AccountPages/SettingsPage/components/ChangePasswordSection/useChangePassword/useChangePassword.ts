import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';

import { authAPI } from '@/services/supabase/auth/api';

// ─── Schema ─────────────────────────────────
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;

// ─── Hook ───────────────────────────────────
export const useChangePassword = () => {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const { reset, setError } = form;

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: async (values: PasswordFormValues) => {
      const { error } = await authAPI.updatePassword(values.currentPassword, values.newPassword);

      if (error) throw error;
    },

    onSuccess: () => {
      reset();
    },

    onError: (error: { message: string }) => {
      // map backend error → form error
      if (error.message?.toLowerCase().includes('current password')) {
        setError('currentPassword', { message: error.message });
      }
    },
  });

  return {
    ...form,
    changePassword,
    isPending,
  };
};
