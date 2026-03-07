import type { AddToCartButtonVariant } from '../../components.type';

export const baseStyles = 'rounded-full text-white w-10 h-10 flex-center cursor-pointer';

export const variantStyles: Record<AddToCartButtonVariant, string> = {
  default: 'bg-primary hover:bg-primary-hard',
  secondary: 'bg-gray-50',
};
export const iconVariantStyles: Record<AddToCartButtonVariant, string> = {
  default: '',
  secondary: 'text-gray-900',
};
