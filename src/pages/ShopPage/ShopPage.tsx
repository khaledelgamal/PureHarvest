import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/Buttons/Button/Button';
import { ShopFilterSection } from './components/ShopFilterSection/ShopFilterSection';
import { ProductList } from './components/ProductList/ProductList';
import { useProducts } from './hooks/useProducts';
import { classNames } from '@/utils';
import { sectionContainer } from '@/constants/global.styles';

import { useTranslation } from 'react-i18next';

export default function ShopPage() {
  const { t } = useTranslation('pages/ShopPage');
  const [isFilterOpen, setIsFilterOpen] = useState(true);

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

  return (
    <div className={`${sectionContainer} py-8 flex flex-col gap-6`}>
      {/* Top Action Bar */}
      <div className="flex items-center">
        <Button
          size="lg"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={classNames(
            'flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-300',
            isFilterOpen
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-primary',
          )}
        >
          <span>{t('filterBtn', 'Filter')}</span>
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Animated Filter Sidebar — Desktop */}
        <div
          className={classNames(
            'transition-all duration-500 ease-in-out origin-left overflow-hidden hidden lg:block',
            isFilterOpen ? 'w-[280px] opacity-100' : 'w-0 opacity-0',
          )}
        >
          <ShopFilterSection
            search={search}
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

        {/* Mobile Filter Sidebar */}
        {isFilterOpen && (
          <div className="lg:hidden w-full">
            <ShopFilterSection
              search={search}
              category={category}
              tag={tag}
              minPrice={minPrice}
              maxPrice={maxPrice}
              categories={categories}
              tags={tags}
              isLoadingCategories={isLoadingCategories}
              isLoadingTags={isLoadingTags}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {/* Product List Area */}
        <div className="flex-1 w-full min-w-0 transition-all duration-500">
          <ProductList
            products={products}
            totalProducts={totalProducts}
            totalPages={totalPages}
            page={page}
            sortBy={sortBy}
            sortOrder={sortOrder}
            isLoading={isLoadingProducts || !isProductsEnabled}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  );
}
