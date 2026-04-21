export const buttonVariants = ['fill', 'border', 'ghost', 'text'] as const;
export type ButtonVariant = (typeof buttonVariants)[number];
export const buttonSizes = ['sm', 'md', 'lg'] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export const addToCartButtonVariants = ['default', 'secondary'] as const;
export type AddToCartButtonVariant = (typeof addToCartButtonVariants)[number];

export const addToWishlistButtonVariants = ['default', 'active'] as const;
export type AddToWishlistButtonVariant = (typeof addToWishlistButtonVariants)[number];

export const priceDisplaySizes = ['sm', 'md', 'lg'] as const;
export type PriceDisplaySize = (typeof priceDisplaySizes)[number];

export type DropDownColors = {
  trigger?: string;
  option?: string;
  active?: string;
  bg?: string;
};
