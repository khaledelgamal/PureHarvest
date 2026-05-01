// hooks/useChangePassword.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authAPI } from '@/services/supabase/auth/api';
import { passwordValidation } from '@/utils/validation/passwordSchema';

// ─── Schema ─────────────────────────────────
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;

// ─── Hook ───────────────────────────────────
export const useChangePassword = () => {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { reset } = form;

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: async (values: PasswordFormValues) => {
      const { error } = await authAPI.updatePassword(values.currentPassword, values.newPassword);
      if (error) throw error;
    },

    onSuccess: () => {
      reset();
      toast.success('Password changed successfully');
    },

    onError: (error: Error | { message: string }) => {
      const errorMessage = error instanceof Error ? error.message : error.message;

      toast.error(errorMessage || 'Failed to change password');
    },
  });

  return {
    ...form,
    changePassword,
    isPending,
  };
};
