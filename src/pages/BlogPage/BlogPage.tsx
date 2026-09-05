import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Buttons/Button/Button';
import CloseButton from '@/components/Buttons/CloseButton/CloseButton';
import { BlogListFilterSection } from './components/BlogListFilterSection/BlogListFilterSection';
import { BlogList } from './components/BlogList/BlogList';
import { useBlogs } from './hooks/useBlogs';
import { classNames } from '@/utils';
import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';

export default function BlogPage() {
  const { t } = useTranslation('pages/BlogPage');
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(true);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

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

  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileModalOpen]);

  return (
    <div className={`w-full ${sectionContainer} ${sectionPaddingX} py-8 flex flex-col gap-6`}>
      {/* Top Action Bar - filter toggle on desktop / modal opener on mobile */}
      <div className="flex items-center">
        {/* Desktop Filter Toggle */}
        <Button
          onClick={() => setIsDesktopFilterOpen(!isDesktopFilterOpen)}
          className={classNames(
            'hidden lg:flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-300',
            isDesktopFilterOpen
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-primary',
          )}
        >
          <span>{t('filterBtn', 'Filter')}</span>
          <Filter className="w-4 h-4" />
        </Button>

        {/* Mobile Filter Modal Opener */}
        <Button
          onClick={() => setIsMobileModalOpen(true)}
          className="lg:hidden flex items-center gap-2 rounded-full px-5 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300"
        >
          <span>{t('filterBtn', 'Filter')}</span>
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        {/* Animated Filter Sidebar — Desktop */}
        <div
          className={classNames(
            'transition-all duration-500 ease-in-out origin-left overflow-hidden hidden lg:block',
            isDesktopFilterOpen ? 'w-[312px] opacity-100' : 'w-0 opacity-0',
          )}
        >
          <BlogListFilterSection
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

        {/* Mobile Filter Modal */}
        <div
          className={classNames(
            'fixed inset-0 z-50 lg:hidden transition-opacity duration-300',
            isMobileModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          )}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileModalOpen(false)}
          />

          {/* Modal Drawer */}
          <div
            className={classNames(
              'fixed inset-y-0 left-0 max-w-xs sm:max-w-sm w-full bg-white shadow-2xl z-10 flex flex-col transition-transform duration-300 ease-in-out',
              isMobileModalOpen ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-gray-900 text-lg">{t('filterBtn', 'Filter')}</h3>
              </div>
              <CloseButton onClick={() => setIsMobileModalOpen(false)} />
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <BlogListFilterSection
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
          </div>
        </div>

        {/* Blog List Area */}
        <div
          className={`flex-1 w-full min-w-0 transition-all duration-500 ${!isDesktopFilterOpen ? '-ml-8' : ''}`}
        >
          <BlogList
            posts={posts}
            totalPosts={totalPosts}
            totalPages={totalPages}
            page={page}
            sortBy={sortBy}
            search={search}
            isLoading={isLoadingPosts}
            onFilterChange={handleFilterChange}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
