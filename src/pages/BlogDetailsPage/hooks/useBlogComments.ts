import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { blogAPI } from '@/services/supabase/blog/api';
import { blogKeys } from '@/services/supabase/blog/keys';
import useAuthStore from '@/store/useAuthStore';
import { routePaths } from '@/router/routePaths';
import { useProfile } from '@/hooks/useProfile';

export const useBlogComments = (postId?: string) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const LIMIT = 5;

  const { data: profile } = useProfile();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: blogKeys.comments(postId || '', 0),
    queryFn: async ({ pageParam = 1 }) => {
      if (!postId) throw new Error('No post ID');
      const { data, error } = await blogAPI.getComments(postId, pageParam, LIMIT);
      if (error) throw error;
      const nextPage = data.total > pageParam * LIMIT ? pageParam + 1 : undefined;
      return {
        ...data,
        nextPage,
      };
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
    enabled: !!postId,
  });

  const comments = data?.pages.flatMap(page => page.comments) ?? [];
  const totalComments = data?.pages[0]?.total ?? 0;

  const { mutate: addComment, isPending: isAddingComment } = useMutation({
    mutationFn: async (message: string) => {
      if (!postId || !user) throw new Error('Cannot add comment');
      const { data, error } = await blogAPI.addComment({
        postId,
        userName: `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Anonymous',
        userEmail: user.email || '',
        userAvatar: profile?.avatarUrl || undefined,
        message,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.comments(postId || '', 0) });
    },
  });

  const handleSignInRedirect = () => {
    navigate(routePaths.ACCOUNT.SIGNIN, { state: { from: location.pathname } });
  };

  return {
    comments,
    totalComments,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isAddingComment,
    addComment,
    user,
    handleSignInRedirect,
  };
};
