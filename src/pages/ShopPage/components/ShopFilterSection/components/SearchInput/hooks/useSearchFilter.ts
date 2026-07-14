import { useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';

export const useSearchFilter = (
  initialSearch: string,
  onSearchChange: (value: string | null) => void,
) => {
  const [searchState, setSearchState] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchState, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch || null);
  }, [debouncedSearch]);

  return {
    searchState,
    setSearchState,
  };
};
