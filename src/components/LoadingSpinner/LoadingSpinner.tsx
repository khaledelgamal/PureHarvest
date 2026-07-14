import React from 'react';

export interface LoadingSpinnerProps {
  color?: string;
  radiusInPx?: number;
  loadingSpeed?: number;
  borderWidth?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = '#00B207',
  radiusInPx = 16,
  loadingSpeed = 1,
  borderWidth = 3,
}) => {
  return (
    <div
      className="inline-block animate-spin rounded-full"
      style={{
        width: `${radiusInPx}px`,
        height: `${radiusInPx}px`,
        borderWidth: `${borderWidth}px`,
        borderStyle: 'solid',
        borderColor: `${color}33`, // Track color with some transparency
        borderTopColor: color, // Solid color for the spinning indicator
        animationDuration: `${loadingSpeed}s`,
      }}
      role="status"
      aria-label="Loading..."
    />
  );
};

export default LoadingSpinner;
