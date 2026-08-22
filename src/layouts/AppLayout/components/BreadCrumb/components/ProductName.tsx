import { useQuery } from '@tanstack/react-query';
import { productsAPI } from '@/services/supabase/products/api';

interface ProductNameProps {
  id: string;
}

export function ProductName({ id }: ProductNameProps) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await productsAPI.getProductById(id);
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <span className="inline-block h-4 w-24 animate-pulse rounded bg-white/30" />;
  }

  return <span>{product?.name ?? id}</span>;
}
