import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { productsAPI, productKeys } from '@/services/supabase/products';
import { useProfile } from '@/hooks/useProfile';

const ITEMS_PER_PAGE = 12;

export const useProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: userProfile } = useProfile();
  // Extract params from URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const tag = searchParams.get('tag') || '';
  const sortBy =
    (searchParams.get('sortBy') as 'price' | 'rating_avg' | 'created_at' | 'name') || 'created_at';
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const minPrice = searchParams.has('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const maxPrice = searchParams.has('maxPrice') ? Number(searchParams.get('maxPrice')) : 1000;
  const ratingAvg = searchParams.has('ratingAvg')
    ? Number(searchParams.get('ratingAvg'))
    : undefined;
  // Queries
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: productKeys.categories(),
    queryFn: async () => {
      const { data, error } = await productsAPI.getCategoriesWithCount();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hour
  });

  const { data: tagsData, isLoading: isLoadingTags } = useQuery({
    queryKey: productKeys.tags(),
    queryFn: async () => {
      const { data, error } = await productsAPI.getTags();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hour
  });

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isEnabled: isProductsEnabled,
  } = useQuery({
    queryKey: productKeys.list({
      page,
      search,
      category,
      tag,
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      ratingAvg,
      userId: userProfile?.id,
    }),
    enabled: !!userProfile?.id,
    queryFn: async () => {
      const { data, error } = await productsAPI.getProducts({
        page,
        limit: ITEMS_PER_PAGE,
        search,
        category,
        tag,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
        ratingAvg,
        userId: userProfile?.id,
      });
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handlers for updating filters
  const handleFilterChange = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value !== null && value !== '') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Reset page to 1 on filter change
    if (key !== 'page') {
      newParams.set('page', '1');
    }
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    handleFilterChange('page', newPage.toString());
  };
  const handleSortChange = (value: string) => {
    const [col, order] = value.split('-');
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', col);
    newParams.set('sortOrder', order);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };
  return {
    // State
    search,
    category,
    tag,
    sortBy,
    sortOrder,
    page,
    minPrice,
    maxPrice,
    ratingAvg,

    // Data
    categories: categoriesData ?? [],
    tags: tagsData ?? [],
    products: productsData?.products ?? [],
    totalProducts: productsData?.total ?? 0,
    totalPages: Math.ceil((productsData?.total ?? 0) / ITEMS_PER_PAGE),

    // Loading states
    isLoadingCategories,
    isLoadingTags,
    isLoadingProducts,
    isProductsEnabled,
    // Handlers
    handleFilterChange,
    handlePageChange,
    handleSortChange,
  };
};
