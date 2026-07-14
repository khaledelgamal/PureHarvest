import { useState, useEffect, useCallback } from 'react';
import useDebounce from '@/hooks/useDebounce';

const VISIBILITY_STORAGE_KEY = 'shop-filter-price';

export const usePriceSection = (
  initialMinPrice: number = 0,
  initialMaxPrice: number = 50,
  onPriceChange: (min: number | null, max: number | null) => void,
) => {
  // Visibility state
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    const saved = localStorage.getItem(VISIBILITY_STORAGE_KEY);
    return saved !== null ? saved === 'true' : false;
  });

  const toggleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  useEffect(() => {
    localStorage.setItem(VISIBILITY_STORAGE_KEY, String(isVisible));
  }, [isVisible]);

  // Price filter logic
  const [localMinPrice, setLocalMinPrice] = useState<number>(initialMinPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(initialMaxPrice);
  const debouncedMinPrice = useDebounce(localMinPrice, 300);
  const debouncedMaxPrice = useDebounce(localMaxPrice, 300);

  useEffect(() => {
    if (initialMinPrice !== debouncedMinPrice) {
      onPriceChange(debouncedMinPrice, null);
    }
    if (initialMaxPrice !== debouncedMaxPrice) {
      onPriceChange(null, debouncedMaxPrice);
    }
  }, [debouncedMinPrice, debouncedMaxPrice]);

  const handlePriceChange = ([newMin, newMax]: [number, number]) => {
    setLocalMinPrice(newMin);
    setLocalMaxPrice(newMax);
  };

  return {
    isVisible,
    toggleVisibility,
    localMinPrice,
    localMaxPrice,
    handlePriceChange,
  };
};
