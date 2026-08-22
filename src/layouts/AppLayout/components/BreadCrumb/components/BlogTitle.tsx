import { useQuery } from '@tanstack/react-query';
import { blogKeys } from '@/services/supabase/blog/keys';
import { blogAPI } from '@/services/supabase/blog/api';

interface BlogTitleProps {
  blogId: string;
}

export function BlogTitle({ blogId }: BlogTitleProps) {
  const { data: post, isLoading } = useQuery({
    queryKey: blogKeys.postById(blogId),
    queryFn: async () => {
      const { data, error } = await blogAPI.getPostById(blogId);
      if (error) throw error;
      return data;
    },
    enabled: !!blogId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <span className="inline-block h-4 w-32 animate-pulse rounded bg-white/30" />;
  }

  return <span>{post?.title ?? blogId}</span>;
}
