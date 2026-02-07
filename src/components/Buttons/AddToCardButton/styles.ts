import type { AddToCardButtonVariant } from '../../components.type';

export const baseStyles = 'rounded-full text-white w-10 h-10 flex-center cursor-pointer';

export const variantStyles: Record<AddToCardButtonVariant, string> = {
  default: 'bg-primary hover:bg-primary-hard',
  secondary: 'bg-gray-50',
};
export const iconVariantStyles: Record<AddToCardButtonVariant, string> = {
  default: '',
  secondary: 'text-gray-900',
};
