import { useState } from 'react';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Buttons/Button/Button';
import { BlogListFilterSection } from './components/BlogListFilterSection/BlogListFilterSection';
import { BlogList } from './components/BlogList/BlogList';
import { useBlogs } from './hooks/useBlogs';
import { classNames } from '@/utils';

export default function BlogPage() {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const {
    search,
    category,
    tag,
    sortBy,
    page,
    categories,
    tags,
    recentPosts,
    posts,
    totalPosts,
    totalPages,
    isLoadingCategories,
    isLoadingTags,
    isLoadingRecentPosts,
    isLoadingPosts,
    handleFilterChange,
    handlePageChange,
  } = useBlogs();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      {/* Top Action Bar - contains filter toggle */}
      <div className="flex items-center">
        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={classNames(
            'flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-300',
            isFilterOpen
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-primary',
          )}
        >
          <span>{t('blog.filterBtn', 'Filter')}</span>
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        {/* Animated Filter Sidebar */}
        <div
          className={classNames(
            'transition-all duration-500 ease-in-out origin-left overflow-hidden hidden lg:block',
            isFilterOpen ? 'w-[312px] opacity-100' : 'w-0 opacity-0',
          )}
        >
          <BlogListFilterSection
            search={search}
            category={category}
            tag={tag}
            categories={categories}
            tags={tags}
            recentPosts={recentPosts}
            isLoadingCategories={isLoadingCategories}
            isLoadingTags={isLoadingTags}
            isLoadingRecentPosts={isLoadingRecentPosts}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Mobile Filter Sidebar (drawer style) */}
        {isFilterOpen && (
          <div className="lg:hidden w-full">
            <BlogListFilterSection
              search={search}
              category={category}
              tag={tag}
              categories={categories}
              tags={tags}
              recentPosts={recentPosts}
              isLoadingCategories={isLoadingCategories}
              isLoadingTags={isLoadingTags}
              isLoadingRecentPosts={isLoadingRecentPosts}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {/* Blog List Area */}
        <div className="flex-1 w-full min-w-0 transition-all duration-500">
          <BlogList
            posts={posts}
            totalPosts={totalPosts}
            totalPages={totalPages}
            page={page}
            sortBy={sortBy}
            isLoading={isLoadingPosts}
            onFilterChange={handleFilterChange}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
