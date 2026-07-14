import { useState, useEffect, useCallback } from 'react';

const VISIBILITY_STORAGE_KEY = 'shop-filter-rating';

export const useRatingSection = (
  currentRating: number | undefined,
  onRatingChange: (value: number | undefined) => void,
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

  // Rating filter logic
  const handleRatingChange = useCallback(
    (rating: number) => {
      onRatingChange(currentRating === rating ? undefined : rating);
    },
    [currentRating],
  );

  return {
    isVisible,
    toggleVisibility,
    handleRatingChange,
  };
};
