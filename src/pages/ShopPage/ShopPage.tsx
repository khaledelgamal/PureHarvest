import { useState, useEffect } from 'react';
import { Filter, Settings2 } from 'lucide-react';
import { Button } from '@/components/Buttons/Button/Button';
import CloseButton from '@/components/Buttons/CloseButton/CloseButton';
import { ShopFilterSection } from './components/ShopFilterSection/ShopFilterSection';
import { ProductList } from './components/ProductList/ProductList';
import { useProducts } from './hooks/useProducts';
import { classNames } from '@/utils';
import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import { useTranslation } from 'react-i18next';

export default function ShopPage() {
  const { t } = useTranslation('pages/ShopPage');
  const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(true);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const {
    search,
    category,
    tag,
    sortBy,
    sortOrder,
    page,
    minPrice,
    maxPrice,
    ratingAvg,
    categories,
    tags,
    products,
    totalProducts,
    totalPages,
    isLoadingCategories,
    isLoadingTags,
    isLoadingProducts,
    isProductsEnabled,
    handleFilterChange,
    handlePageChange,
    handleSortChange,
  } = useProducts();

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
    <div className={`${sectionContainer} ${sectionPaddingX} py-8 flex flex-col gap-6`}>
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
          <Settings2 className="w-5 h-5" />
        </Button>

        {/* Mobile Filter Modal Opener */}
        <Button
          onClick={() => setIsMobileModalOpen(true)}
          className="lg:hidden flex items-center gap-2 rounded-full px-5 py-2 bg-primary text-white hover:bg-primary-dark transition-all duration-300"
        >
          <span>{t('filterBtn', 'Filter')}</span>
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        {/* Animated Filter Sidebar — Desktop */}
        <div
          className={classNames(
            'transition-all duration-500 ease-in-out origin-left overflow-hidden hidden lg:block',
            isDesktopFilterOpen ? 'w-[280px] opacity-100' : 'w-0 opacity-0',
          )}
        >
          <ShopFilterSection
            category={category}
            tag={tag}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categories={categories}
            tags={tags}
            isLoadingCategories={isLoadingCategories}
            isLoadingTags={isLoadingTags}
            ratingAvg={ratingAvg}
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
              'fixed inset-y-0 left-0 sm:max-w-sm w-full bg-white shadow-2xl z-10 flex flex-col transition-transform duration-300 ease-in-out',
              isMobileModalOpen ? 'translate-x-0' : '-translate-x-full',
            )}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 text-lg">{t('filterBtn', 'Filter')}</h3>
                <Filter className="w-4 h-4 text-primary" />
              </div>
              <CloseButton onClick={() => setIsMobileModalOpen(false)} />
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <ShopFilterSection
                category={category}
                tag={tag}
                minPrice={minPrice}
                maxPrice={maxPrice}
                categories={categories}
                tags={tags}
                isLoadingCategories={isLoadingCategories}
                isLoadingTags={isLoadingTags}
                ratingAvg={ratingAvg}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        {/* Product List Area */}
        <div
          className={`flex-1 w-full min-w-0 transition-all duration-500 ${!isDesktopFilterOpen ? '-ml-8' : ''}`}
        >
          <ProductList
            products={products}
            totalProducts={totalProducts}
            totalPages={totalPages}
            page={page}
            sortBy={sortBy}
            sortOrder={sortOrder}
            search={search}
            isLoading={isLoadingProducts || !isProductsEnabled}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
            onSearchChange={value => handleFilterChange('search', value)}
          />
        </div>
      </div>
    </div>
  );
}
