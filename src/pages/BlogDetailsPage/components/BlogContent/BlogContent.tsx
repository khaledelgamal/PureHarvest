import { Tag, User, MessageCircle, Calendar } from 'lucide-react';
import type { BlogPost } from '@/services/supabase/blog/types';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
interface BlogContentProps {
  post: BlogPost;
}

export const BlogContent = ({ post }: BlogContentProps) => {
  const publishedDate = post.publishedAt ? dayjs(post.publishedAt) : null;
  const contentHTML = post.content || '';

  return (
    <article className="flex flex-col gap-6 bg-white rounded-2xl overflow-hidden">
      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full aspect-[21/9] bg-gray-50 relative overflow-hidden">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-primary" />
            <span>{post.category?.name || 'Uncategorized'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-primary" />
            <span>By {post.authorName || 'Admin'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span>{post.commentCount || 0} Comments</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{publishedDate ? publishedDate.format('MMM DD, YYYY') : 'Unknown Date'}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>

        {/* Content */}
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(contentHTML) }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-900 mr-2">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-100"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export const BlogContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
      <div className="w-full aspect-[21/9] bg-gray-200"></div>
      <div className="p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex gap-4 border-b border-gray-100 pb-4">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
