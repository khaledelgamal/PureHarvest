import { useInfiniteQuery } from '@tanstack/react-query';
import { productsAPI } from '@/services/supabase/products/api';

const useProductReviews = (productId: string, limit: number = 5, sort: string = 'newest') => {
  return useInfiniteQuery({
    queryKey: ['productReviews', productId, sort],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await productsAPI.getProductReviews(productId, pageParam, limit, sort);
      if (response.error) throw new Error(response.error.message);
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      const currentCount = allPages.reduce((sum, page) => sum + (page?.reviews.length || 0), 0);
      return currentCount < lastPage.total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!productId,
  });
};

export default useProductReviews;
