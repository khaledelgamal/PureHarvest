import { useState, useEffect, useCallback } from 'react';

const VISIBILITY_STORAGE_KEY = 'shop-filter-tags';

export const useTagsSection = (currentTag: string, onTagChange: (value: string | null) => void) => {
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

  // Tags filter logic
  const handleTagChange = useCallback(
    (slug: string) => {
      onTagChange(currentTag === slug ? null : slug);
    },
    [currentTag, onTagChange],
  );

  return {
    isVisible,
    toggleVisibility,
    handleTagChange,
  };
};
