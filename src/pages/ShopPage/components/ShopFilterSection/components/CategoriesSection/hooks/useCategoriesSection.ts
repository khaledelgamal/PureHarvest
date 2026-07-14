import { useState, useEffect, useCallback } from 'react';

const VISIBILITY_STORAGE_KEY = 'shop-filter-categories';

export const useCategoriesSection = (
  currentCategory: string,
  onCategoryChange: (value: string | null) => void,
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

  // Filter logic
  const handleCategoryChange = useCallback(
    (slug: string) => {
      onCategoryChange(currentCategory === slug ? null : slug);
    },
    [currentCategory, onCategoryChange],
  );

  const handleClearCategory = useCallback(() => {
    onCategoryChange('');
  }, [onCategoryChange]);

  return {
    isVisible,
    toggleVisibility,
    handleCategoryChange,
    handleClearCategory,
  };
};
