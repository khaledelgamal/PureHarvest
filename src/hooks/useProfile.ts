import { profilesAPI } from '@/services/supabase/profiles/api';
import { profileKeys } from '@/services/supabase/profiles/keys';
import useAuthStore from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  const userId = useAuthStore(s => s.user?.id);
  return useQuery({
    queryKey: profileKeys.profile(userId ?? ''),
    queryFn: async () => {
      const { data, error } = await profilesAPI.getProfile(userId!);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
