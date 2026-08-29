import { useRef, useState, useEffect, type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/Buttons/Button/Button';
import SearchIcon from '@/icons/SearchIcon';
import useDebounce from '@/hooks/useDebounce';
import { productsAPI } from '@/services/supabase/products/api';
import { productKeys } from '@/services/supabase/products/keys';
import { routePaths } from '@/router/routePaths';
import { menuStyles, menuOpenStyles, menuClosedStyles } from '@/components/DropDown/styles';
import { classNames } from '@/utils';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';

const SEARCH_LIMIT = 6;

const GlobalSearch = () => {
  const { t } = useTranslation('layouts/AppLayout');
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const pathname = window.location.pathname;
  const { data, isFetching, isLoading } = useQuery({
    queryKey: productKeys.list({ search: debouncedQuery, limit: SEARCH_LIMIT }),
    queryFn: async () => {
      const { data, error } = await productsAPI.getProducts({
        search: debouncedQuery,
        limit: SEARCH_LIMIT,
      });
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: debouncedQuery.trim().length >= 2,
    staleTime: 1000 * 60 * 2,
  });

  const products = data?.products ?? [];
  const showDropdown = isOpen && debouncedQuery.trim().length >= 2 && !isLoading;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    productId: string,
  ) => {
    if (e.ctrlKey) return;

    setIsOpen(false);
    const product = products.find(p => p.id === productId);
    if (product) {
      setQuery(product.name);
    }
  };

  const handleSearchButtonClick = () => {
    if (query.trim()) {
      navigate(`${routePaths.SHOP.ROOT}?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!/^\/shop\/([^/]+)$/.test(pathname)) {
      setQuery('');
    }
  }, [pathname]);
  return (
    <div ref={wrapperRef} className="relative flex justify-center gap-0">
      {/* Input */}
      <div className="max-w-[400px] w-[340px] flex items-center gap-2 pl-4 py-3 rounded-l-md border border-r-0 border-gray-100">
        <SearchIcon className="text-gray-400 w-5 h-5 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={e => e.key === 'Enter' && handleSearchButtonClick()}
          placeholder={t('searchPlaceholder', 'Search')}
          className="w-full placeholder:text-gray-500 outline-none text-sm"
        />
        {isFetching && <Loader2 className="w-4 h-4 text-gray-400 animate-spin shrink-0" />}
      </div>

      {/* Search button */}
      <Button
        variant="fill"
        size="md"
        className="rounded-r-md rounded-l-none font-semibold text-sm"
        onClick={handleSearchButtonClick}
      >
        {t('search', 'Search')}
      </Button>

      {/* Results dropdown */}
      <ul
        className={classNames(
          menuStyles,
          'bg-white overflow-auto w-full',
          showDropdown ? menuOpenStyles : menuClosedStyles,
        )}
      >
        {products.length === 0 && !isFetching ? (
          <li className="px-3 py-4 text-sm text-gray-400 text-center">No products found</li>
        ) : (
          products.map(product => (
            <li
              key={product.id}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors rounded-sm"
            >
              <Link
                to={routePaths.SHOP.ITEM_DETAILS.path(product.id)}
                onClick={e => handleSelect(e, product.id)}
              >
                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 shrink-0">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>

                {/* Name + price */}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                  <span className="text-xs text-primary font-semibold">
                    <PriceDisplay price={product.salePrice ?? product.price} size="sm" />
                  </span>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default GlobalSearch;
