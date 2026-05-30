import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { blogAPI } from '@/services/supabase/blog/api';
import { blogKeys } from '@/services/supabase/blog/keys';

const ITEMS_PER_PAGE = 10;

export const useBlogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract params from URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const tag = searchParams.get('tag') || '';
  const sortBy = (searchParams.get('sortBy') as 'published_at' | 'created_at' | 'title') || 'published_at';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Queries
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: blogKeys.categories(),
    queryFn: async () => {
      const { data, error } = await blogAPI.getCategories();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: tagsData, isLoading: isLoadingTags } = useQuery({
    queryKey: blogKeys.tags(),
    queryFn: async () => {
      const { data, error } = await blogAPI.getTags();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: recentPostsData, isLoading: isLoadingRecentPosts } = useQuery({
    queryKey: blogKeys.recentPosts(3),
    queryFn: async () => {
      const { data, error } = await blogAPI.getRecentPosts(3);
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: blogKeys.posts({ page, search, category, tag, sortBy }),
    queryFn: async () => {
      const { data, error } = await blogAPI.getPosts({
        page,
        limit: ITEMS_PER_PAGE,
        search,
        category,
        tag,
        sortBy,
        sortOrder: 'desc', // default descending for now
      });
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handlers for updating filters
  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
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

  return {
    // State
    search,
    category,
    tag,
    sortBy,
    page,
    
    // Data
    categories: categoriesData ?? [],
    tags: tagsData ?? [],
    recentPosts: recentPostsData ?? [],
    posts: postsData?.posts ?? [],
    totalPosts: postsData?.total ?? 0,
    totalPages: Math.ceil((postsData?.total ?? 0) / ITEMS_PER_PAGE),
    
    // Loading states
    isLoadingCategories,
    isLoadingTags,
    isLoadingRecentPosts,
    isLoadingPosts,
    
    // Handlers
    handleFilterChange,
    handlePageChange,
  };
};
