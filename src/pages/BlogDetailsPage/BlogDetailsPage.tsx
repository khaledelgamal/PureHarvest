import { BlogContent, BlogContentSkeleton } from './components/BlogContent/BlogContent';
import { BlogComments } from './components/BlogComments/BlogComments';
import { sectionContainer } from '@/constants/global.styles';
import { BlogDetailsAdBanner } from './components/BlogDetailsAdBanner/BlogDetailsAdBanner';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogKeys } from '@/services/supabase/blog/keys';
import { blogAPI } from '@/services/supabase/blog/api';

export default function BlogDetailsPage() {
  const { blogId } = useParams<{ blogId: string }>();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: blogKeys.postById(blogId || ''),
    queryFn: async () => {
      if (!blogId) throw new Error('No blog slug provided');
      const { data, error } = await blogAPI.getPostById(blogId);
      if (error) throw error;
      return data;
    },
    enabled: !!blogId,
  });

  if (error) {
    return (
      <div className={`${sectionContainer} py-16 text-center`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h2>
        <p className="text-gray-500">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className={`${sectionContainer} py-8 flex flex-col`}>
      {isLoading || !post ? <BlogContentSkeleton /> : <BlogContent post={post} />}
      <BlogDetailsAdBanner />
      {post && <BlogComments postId={post.id} />}
    </div>
  );
}
