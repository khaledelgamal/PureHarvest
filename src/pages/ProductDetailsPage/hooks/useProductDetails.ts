import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/services/supabase/products/api';
import useAuthStore from '@/store/useAuthStore';

export const useProductDetails = (id: string) => {
  const user = useAuthStore(state => state.user);

  return useQuery({
    queryKey: ['product', id, user?.id],
    queryFn: async () => {
      const response = await productsAPI.getProductById(id, user?.id);
      if (response.error) throw new Error(response.error.message);
      if (!response.data) throw new Error('Product not found');
      return response.data;
    },
    enabled: !!id,
  });
};
