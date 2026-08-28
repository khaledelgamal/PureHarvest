import { ChevronLeft, ChevronRight } from 'lucide-react';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import { ProductCard, ProductCardSkeleton } from './components/ProductCard/ProductCard';
import type { Product } from '@/services/supabase/products/types';
import { useTranslation } from 'react-i18next';

interface ProductListProps {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  page: number;
  sortBy: string;
  sortOrder: string;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (value: string) => void;
}

export const ProductList = ({
  products,
  totalProducts,
  totalPages,
  page,
  sortBy,
  sortOrder,
  isLoading,
  onPageChange,
  onSortChange,
}: ProductListProps) => {
  const { t } = useTranslation('pages/ShopPage');
  const currentSort = `${sortBy}-${sortOrder}`;

  const sortOptions = [
    { label: t('sortLatest', 'Latest'), value: 'created_at-desc' },
    { label: t('sortOldest', 'Oldest'), value: 'created_at-asc' },
    { label: t('sortPriceLowHigh', 'Price: Low to High'), value: 'price-asc' },
    { label: t('sortPriceHighLow', 'Price: High to Low'), value: 'price-desc' },
    { label: t('sortTopRated', 'Top Rated'), value: 'rating_avg-desc' },
    { label: t('sortNameAZ', 'Name (A-Z)'), value: 'name-asc' },
  ];

  const handleSortChange = async (value: string) => {
    onSortChange(value);
  };

  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-sm">{t('sortBy', 'Sort by:')}</span>
          <div className="w-[200px]">
            <SelectInput
              options={sortOptions}
              value={currentSort}
              onChange={e => handleSortChange(e.target.value)}
              className="py-2.5"
            />
          </div>
        </div>

        <div className="text-sm">
          <span className="font-semibold text-gray-900">{totalProducts}</span>
          <span className="text-gray-500 ml-1">{t('resultsFound', 'Results Found')}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            {[...Array(12)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500">
                <p>{t('noProductsFound', 'No products found matching your filters.')}</p>
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
              return (
                <span key={pageNum} className="text-gray-400">
                  ...
                </span>
              );
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
