import { Link } from 'react-router-dom';
import { User, MessageCircle, ArrowRight, Tag } from 'lucide-react';
import type { BlogPost } from '@/services/supabase/blog/types';
import { routePaths } from '@/router/routePaths';
import dayjs from 'dayjs';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const publishedDate = post.publishedAt ? dayjs(post.publishedAt) : null;
  const day = publishedDate?.format('DD');
  const month = publishedDate?.format('MMM').toUpperCase();

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-gray-50 overflow-hidden">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            No Image
          </div>
        )}

        {/* Date Badge */}
        {publishedDate && (
          <div className="absolute bottom-4 left-4 bg-white rounded flex flex-col items-center justify-center px-3 py-1 shadow-sm">
            <span className="text-xl font-bold text-gray-900 leading-tight">{day}</span>
            <span className="text-[10px] font-medium text-gray-500">{month}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>{post.category?.name || 'Food'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>By {post.authorName || 'Admin'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{post.commentCount || 65} Comments</span>
          </div>
        </div>

        {/* Title */}
        <Link to={routePaths.BLOGS.BLOG_DETAILS.path(post.id)}>
          <h3 className="text-lg font-medium text-gray-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors duration-200 cursor-pointer">
            {post.title}
          </h3>
        </Link>

        {/* Read More */}
        <div className="mt-auto">
          <Link
            to={routePaths.BLOGS.BLOG_DETAILS.path(post.id)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200 group/btn"
          >
            Read More
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-[4/3] w-full bg-gray-200"></div>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex gap-4 mb-3">
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-6 w-2/3 bg-gray-200 rounded mb-4"></div>
        <div className="mt-auto h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
