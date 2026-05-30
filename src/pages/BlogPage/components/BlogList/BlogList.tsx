import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import { BlogCard, BlogCardSkeleton } from '../BlogCard/BlogCard';
import type { BlogPost } from '@/services/supabase/blog/types';

interface BlogListProps {
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  page: number;
  sortBy: string;
  isLoading: boolean;
  onFilterChange: (key: string, value: string) => void;
  onPageChange: (page: number) => void;
}

export const BlogList = ({
  posts,
  totalPosts,
  totalPages,
  page,
  sortBy,
  isLoading,
  onFilterChange,
  onPageChange,
}: BlogListProps) => {
  const { t } = useTranslation();

  const sortOptions = [
    { label: t('blog.sort.latest', 'Latest'), value: 'published_at' },
    { label: t('blog.sort.oldest', 'Oldest'), value: 'created_at' },
    { label: t('blog.sort.title', 'Title (A-Z)'), value: 'title' },
  ];

  return (
    <div className="flex-1 flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-sm">{t('blog.sortBy', 'Sort by:')}</span>
          <div className="w-[180px]">
            <SelectInput
              options={sortOptions}
              value={sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="py-2.5"
            />
          </div>
        </div>
        
        <div className="text-sm">
          <span className="font-semibold text-gray-900">{totalPosts}</span>
          <span className="text-gray-500 ml-1">{t('blog.resultsFound', 'Results Found')}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
              <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500">
                <p>No posts found matching your filters.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 mt-2 border-t border-gray-100">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-gray-200
                       text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-200
                       transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            
            // simple pagination display logic
            if (
              pageNum === 1 || 
              pageNum === totalPages || 
              (pageNum >= page - 1 && pageNum <= page + 1)
            ) {
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium
                              transition-all duration-300
                              ${
                                page === pageNum
                                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                                  : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                              }`}
                >
                  {pageNum}
                </button>
              );
            } else if (pageNum === page - 2 || pageNum === page + 2) {
               return <span key={pageNum} className="text-gray-400">...</span>
            }
            return null;
          })}

          <button
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-gray-200
                       text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-200
                       transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
};
