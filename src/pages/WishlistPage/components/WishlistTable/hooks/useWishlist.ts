import { wishlistKeys, wishlistsAPI } from '@/services/supabase/wishlists';
import useAuthStore from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const useWishlist = () => {
  const [searchParams] = useSearchParams();
  const userId = useAuthStore(state => state.user?.id);

  // Cleanly parse the page number once
  const pageParam = searchParams.get('page');
  const currentPage = parseInt(pageParam ?? '0', 10) || 0;

  return useQuery({
    queryKey: wishlistKeys.list(userId || ''),
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data, error } = await wishlistsAPI.getWishlist(userId || '', {
        page: currentPage,
      });

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useWishlist;
