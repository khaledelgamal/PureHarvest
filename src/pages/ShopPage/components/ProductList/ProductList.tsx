import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, SearchIcon } from 'lucide-react';
import SelectInput from '@/components/Inputs/SelectInput/SelectInput';
import { ProductCard, ProductCardSkeleton } from './components/ProductCard/ProductCard';
import type { Product } from '@/services/supabase/products/types';
import { useTranslation } from 'react-i18next';
import useDebounce from '@/hooks/useDebounce';

interface ProductListProps {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  page: number;
  sortBy: string;
  sortOrder: string;
  search?: string;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onSortChange: (value: string) => void;
  onSearchChange: (value: string | null) => void;
}

export const ProductList = ({
  products,
  totalProducts,
  totalPages,
  page,
  sortBy,
  sortOrder,
  search = '',
  isLoading,
  onPageChange,
  onSortChange,
  onSearchChange,
}: ProductListProps) => {
  const { t } = useTranslation('pages/ShopPage');
  const [searchState, setSearchState] = useState<string>(search);
  const debouncedSearch = useDebounce(searchState, 300);

  useEffect(() => {
    if (debouncedSearch !== search) {
      onSearchChange(debouncedSearch || null);
    }
  }, [debouncedSearch, search, onSearchChange]);

  useEffect(() => {
    setSearchState(search);
  }, [search]);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-1">
          {/* Search */}
          <div className="h-[42px] flex items-center gap-2 px-3.5 rounded-md border border-gray-200 bg-white sm:flex-1 max-w-xs sm:max-w-sm focus-within:border-primary transition-colors">
            <SearchIcon className="text-gray-400 w-4 h-4 shrink-0" />
            <input
              type="text"
              name="shop-search"
              placeholder={t('searchPlaceholder', 'Search products...')}
              value={searchState}
              onChange={e => setSearchState(e.target.value)}
              className="w-full text-sm placeholder:text-gray-400 outline-none text-gray-900 bg-transparent"
            />
          </div>

          {/* Sort By */}
          <div className="h-[42px] flex items-center gap-2.5 shrink-0">
            <span className="text-gray-600 text-sm whitespace-nowrap">
              {t('sortBy', 'Sort by:')}
            </span>
            <div className="w-[180px] sm:w-[200px]">
              <SelectInput
                options={sortOptions}
                value={currentSort}
                onChange={e => handleSortChange(e.target.value)}
                className="py-2"
              />
            </div>
          </div>
        </div>

        <div className="text-sm shrink-0">
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
