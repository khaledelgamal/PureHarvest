export const buttonVariants = ['fill', 'border', 'ghost'] as const;
export type ButtonVariant = (typeof buttonVariants)[number];
export const buttonSizes = ['sm', 'md', 'lg'] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export const addToCardButtonVariants = ['default', 'secondary'] as const;
export type AddToCardButtonVariant = (typeof addToCardButtonVariants)[number];

export const addToWishlistButtonVariants = ['default', 'active'] as const;
export type AddToWishlistButtonVariant = (typeof addToWishlistButtonVariants)[number];
