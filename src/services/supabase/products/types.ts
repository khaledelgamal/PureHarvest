export type StockStatus = 'in_stock' | 'out_of_stock';

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  shortDescription: string | null;
  price: number;
  salePrice: number | null;
  stockStatus: StockStatus;
  stockQuantity: number | null;
  weight: number | null;
  color: string | null;
  type: string | null;
  categoryId: string | null;
  brandId: string | null;
  ratingAvg: number | null;
  ratingCount: number | null;
  isFeatured: boolean | null;
  dealExpiresAt: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  // joined fields
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  brand?: {
    id: string;
    name: string;
    slug: string;
  };
  images?: ProductImage[];
  tags?: ProductTag[];
  inWishlist?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user?: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string; // category slug
  tag?: string; // tag slug
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating_avg' | 'created_at' | 'name';
  sortOrder?: 'asc' | 'desc';
  ratingAvg?: number;
  userId?: string;
}
