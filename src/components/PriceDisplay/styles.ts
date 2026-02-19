import type { PriceDisplaySize } from '../components.type';

export const baseStyles = 'text-center';
export const priceStyles = 'text-gray-900 font-medium';
export const oldPriceStyles = 'line-through text-gray-400';
export const sizeStyles: Record<PriceDisplaySize, string> = {
  sm: 'text-md',
  md: 'text-lg',
  lg: 'text-2xl',
};
