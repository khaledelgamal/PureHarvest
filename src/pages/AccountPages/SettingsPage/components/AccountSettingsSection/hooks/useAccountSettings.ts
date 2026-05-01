import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import useAuthStore from '@/store/useAuthStore';
import { profilesAPI } from '@/services/supabase/profiles/api';
import { profileKeys } from '@/services/supabase/profiles/keys';
import type { Profile } from '@/services/supabase/profiles/types';

const accountSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
});

export type AccountFormValues = z.infer<typeof accountSchema>;

export const useAccountSettings = (profile?: Profile) => {
  const user = useAuthStore(s => s.user);
  const queryClient = useQueryClient();
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    values: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      phone: profile?.phone ?? '',
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: AccountFormValues) => {
      const { data, error } = await profilesAPI.updateProfile(user!.id, {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: data => {
      queryClient.setQueryData(profileKeys.profile(user!.id), data);
      toast.success('Account Settings updated successfully');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const { data: url, error: uploadError } = await profilesAPI.uploadAvatar(user!.id, file);
      if (uploadError) throw uploadError;

      const { data, error: updateError } = await profilesAPI.updateProfile(user!.id, {
        avatarUrl: url,
      });
      if (updateError) throw updateError;

      return data;
    },
    onSuccess: data => {
      queryClient.setQueryData(profileKeys.profile(user!.id), data);
      toast.success('Avatar updated successfully');
    },
    onError: () => {
      toast.error('Failed to update avatar');
    },
  });

  const openCropModal = () => setIsCropModalOpen(true);

  const closeCropModal = () => setIsCropModalOpen(false);

  const handleCropComplete = async (croppedFile: File) => {
    uploadMutation.mutate(croppedFile);
    setIsCropModalOpen(false);
  };

  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ');
  const initials = fullName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?';

  return {
    ...form,
    user,
    isCropModalOpen,
    openCropModal,
    closeCropModal,
    handleCropComplete,
    fullName,
    initials,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    isUploading: uploadMutation.isPending,
  };
};
