import type { Product, StockStatus } from './types';

interface SupabaseProductImage {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
  is_primary: boolean;
}

interface SupabaseProductTag {
  id: string;
  name: string;
  slug: string;
}

interface SupabaseProduct {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  short_description: string | null;
  price: number;
  sale_price: number | null;
  stock_status: StockStatus;
  stock_quantity: number | null;
  weight: number | null;
  color: string | null;
  type: string | null;
  category_id: string | null;
  brand_id: string | null;
  rating_avg: number | null;
  rating_count: number | null;
  is_featured: boolean | null;
  deal_expires_at: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  categories?: { id: string; name: string; slug: string } | null;
  brands?: { id: string; name: string; slug: string } | null;
  product_images?: SupabaseProductImage[];
  product_tags?: { tags: SupabaseProductTag }[];
}

export const mapSupabaseProductToProduct = (raw: SupabaseProduct): Product => ({
  id: raw.id,
  name: raw.name,
  slug: raw.slug,
  sku: raw.sku,
  description: raw.description,
  shortDescription: raw.short_description,
  price: Number(raw.price),
  salePrice: raw.sale_price ? Number(raw.sale_price) : null,
  stockStatus: raw.stock_status,
  stockQuantity: raw.stock_quantity,
  weight: raw.weight ? Number(raw.weight) : null,
  color: raw.color,
  type: raw.type,
  categoryId: raw.category_id,
  brandId: raw.brand_id,
  ratingAvg: raw.rating_avg,
  ratingCount: raw.rating_count,
  isFeatured: raw.is_featured,
  dealExpiresAt: raw.deal_expires_at,
  imageUrl: raw.image_url,
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
  category: raw.categories
    ? { id: raw.categories.id, name: raw.categories.name, slug: raw.categories.slug }
    : undefined,
  brand: raw.brands
    ? { id: raw.brands.id, name: raw.brands.name, slug: raw.brands.slug }
    : undefined,
  images: raw.product_images?.map(img => ({
    id: img.id,
    productId: img.product_id,
    imageUrl: img.image_url,
    sortOrder: img.sort_order,
    isPrimary: img.is_primary,
  })),
  tags: raw.product_tags?.map(pt => ({
    id: pt.tags.id,
    name: pt.tags.name,
    slug: pt.tags.slug,
  })),
});

export interface SupabaseProductWithWishlist extends SupabaseProduct {
  wishlists?: { user_id: string }[] | null;
}

export const mapSupabaseProductWithWishlistToProduct = (raw: SupabaseProductWithWishlist): Product => {
  const product = mapSupabaseProductToProduct(raw);
  if (raw.wishlists !== undefined) {
    product.inWishlist = Array.isArray(raw.wishlists) && raw.wishlists.length > 0;
  }
  return product;
};

export interface SupabaseReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles?: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    billing_first_name?: string | null;
    billing_last_name?: string | null;
  } | {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    billing_first_name?: string | null;
    billing_last_name?: string | null;
  }[] | null;
}

export const mapSupabaseReviewToProductReview = (raw: SupabaseReview): ProductReview => {
  const profile = Array.isArray(raw.profiles) ? raw.profiles[0] : raw.profiles;
  
  return {
    id: raw.id,
    productId: raw.product_id,
    userId: raw.user_id,
    rating: raw.rating,
    comment: raw.comment,
    createdAt: raw.created_at,
    user: profile
      ? {
          id: profile.id,
          firstName: profile.first_name || profile.billing_first_name || null,
          lastName: profile.last_name || profile.billing_last_name || null,
          avatarUrl: profile.avatar_url,
        }
      : undefined,
  };
};
