import type { AddToWishlistButtonVariant } from '../../components.type';

export const baseStyles =
  'rounded-full w-10 h-10 flex-center cursor-pointer transition-colors duration-300';

export const variantStyles: Record<AddToWishlistButtonVariant, string> = {
  default: 'bg-white border border-gray-50 hover:bg-primary hover:border-none group',
  active: 'bg-white border border-gray-50',
};

export const iconVariantStyles: Record<AddToWishlistButtonVariant, string> = {
  default: 'text-black group-hover:text-white',
  active: 'text-primary',
};
