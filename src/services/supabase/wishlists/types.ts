import type { Product } from '../products/types';

export interface WishlistItem {
  userId: string;
  productId: string;
  createdAt: string;
  product?: Product;
}

export interface Wishlists {
  items: WishlistItem[];
  total: number;
}
