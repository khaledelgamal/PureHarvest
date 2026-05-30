import { SearchIcon, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/utils';
import type { BlogCategory, BlogTag, RecentBlogPost } from '@/services/supabase/blog/types';
import dayjs from 'dayjs';
import { routePaths } from '@/router/routePaths';
import { useNavigate } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

interface BlogListFilterSectionProps {
  // State
  search: string;
  category: string;
  tag: string;

  // Data
  categories: BlogCategory[];
  tags: BlogTag[];
  recentPosts: RecentBlogPost[];

  // Loading states
  isLoadingCategories: boolean;
  isLoadingTags: boolean;
  isLoadingRecentPosts: boolean;

  // Handlers
  onFilterChange: (key: string, value: string) => void;
}

export const BlogListFilterSection = ({
  search,
  category,
  tag,
  categories,
  tags,
  recentPosts,
  isLoadingCategories,
  isLoadingTags,
  isLoadingRecentPosts,
  onFilterChange,
}: BlogListFilterSectionProps) => {
  const { t } = useTranslation();
  const [searchState, setSearchState] = useState<string>(search);
  const navigate = useNavigate();
  const debouncedValue = useDebounce(searchState, 300);

  useEffect(() => {
    onFilterChange('search', debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="w-[312px] flex-shrink-0 flex flex-col gap-6">
      {/* Search */}
      <div className="flex items-center gap-2 px-4 py-[14px] rounded-md border border-gray-100 bg-white">
        <SearchIcon className="text-gray-900 w-5 h-5 flex-shrink-0" />
        <input
          type="text"
          placeholder={t('blog.searchPlaceholder', 'Search...')}
          value={searchState}
          onChange={e => setSearchState(e.target.value)}
          className="w-full placeholder:text-gray-500 outline-none text-gray-900 bg-transparent"
        />
      </div>

      {/* Top Categories */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-medium text-gray-900">Top Categories</h4>
        {isLoadingCategories ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-5 w-full bg-gray-100 animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {categories.map(c => (
              <li key={c.id}>
                <button
                  onClick={() => onFilterChange('category', category === c.slug ? '' : c.slug)}
                  className={classNames(
                    'w-full flex items-center justify-between text-sm transition-colors duration-200',
                    category === c.slug
                      ? 'text-primary font-medium'
                      : 'text-gray-600 hover:text-primary',
                  )}
                >
                  <span>{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popular Tag */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-medium text-gray-900">Popular Tag</h4>
        {isLoadingTags ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-8 w-16 bg-gray-100 animate-pulse rounded-full"></div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map(tItem => (
              <button
                key={tItem.id}
                onClick={() => onFilterChange('tag', tag === tItem.slug ? '' : tItem.slug)}
                className={classNames(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200',
                  tag === tItem.slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100',
                )}
              >
                {tItem.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recently Added */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-medium text-gray-900">Recently Added</h4>
        {isLoadingRecentPosts ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-[72px] h-[72px] bg-gray-100 rounded-md animate-pulse"></div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 w-full bg-gray-100 animate-pulse rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-100 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {recentPosts.map(rp => (
              <div
                key={rp.id}
                className="flex gap-4 items-center group cursor-pointer"
                onClick={() => navigate(`${routePaths.BLOGS.BLOG_DETAILS.path(rp.id)}`)}
              >
                <div className="w-[72px] h-[72px] rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                  {rp.coverImage ? (
                    <img
                      src={rp.coverImage}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <h5 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {rp.title}
                  </h5>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {rp.publishedAt ? dayjs(rp.publishedAt).format('MMM DD, YYYY') : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
