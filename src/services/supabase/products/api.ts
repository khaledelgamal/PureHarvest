import { supabase } from '../client';
import {
  mapSupabaseProductToProduct,
  mapSupabaseProductWithWishlistToProduct,
  mapSupabaseReviewToProductReview,
  type SupabaseProductWithWishlist,
  type SupabaseReview,
} from './adapters';
import type { Product, ProductsResponse, ProductFilters, ProductReview } from './types';
import type { ServiceResponse } from '../types';

const DEFAULT_LIMIT = 12;

export const productsAPI = {
  // Get paginated/filtered products
  getProducts: async (filters: ProductFilters = {}): Promise<ServiceResponse<ProductsResponse>> => {
    let query = supabase.from('products').select(
      `
        *,
        categories${filters.category ? '!inner' : ''}!products_category_id_fkey (id, name, slug),
        brands (id, name, slug),
        product_images (id, product_id, image_url, sort_order, is_primary),
        product_tags${filters.tag ? '!inner' : ''} (tags${filters.tag ? '!inner' : ''} (id, name, slug))
        ${filters.userId ? ', wishlists (user_id)' : ''}
      `,
      { count: 'exact' },
    );

    // Apply filters
    if (filters.category) {
      query = query.eq('categories.slug', filters.category);
    }
    if (filters.tag) {
      query = query.eq('product_tags.tags.slug', filters.tag);
    }
    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`,
      );
    }
    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.ratingAvg) {
      query = query.gte('rating_avg', filters.ratingAvg);
    }
    // In stock only by default
    query = query.eq('stock_status', 'in_stock');

    if (filters.userId) {
      query = query.eq('wishlists.user_id', filters.userId);
    }

    // Sorting
    const sortColumn = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder === 'asc' ? true : false;
    query = query.order(sortColumn, { ascending: sortOrder });

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || DEFAULT_LIMIT;
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) return { data: null, error: { message: error.message } };

    const products = data.map((item: unknown) => {
      return mapSupabaseProductWithWishlistToProduct(item as SupabaseProductWithWishlist);
    });

    return {
      data: {
        products,
        total: count ?? 0,
      },
      error: null,
    };
  },

  // Get single product by id
  getProductById: async (id: string, userId?: string): Promise<ServiceResponse<Product>> => {
    let query = supabase
      .from('products')
      .select(
        `
        *,
        categories!products_category_id_fkey (id, name, slug),
        brands (id, name, slug),
        product_images (id, product_id, image_url, sort_order, is_primary),
        product_tags (tags (id, name, slug))
        ${userId ? ', wishlists (user_id)' : ''}
      `,
      )
      .eq('id', id);

    if (userId) {
      query = query.eq('wishlists.user_id', userId);
    }

    const { data, error } = await query.single();

    if (error) return { data: null, error: { message: error.message } };

    const product = mapSupabaseProductWithWishlistToProduct(
      data as unknown as SupabaseProductWithWishlist,
    );

    return { data: product, error: null };
  },

  // Get categories with product counts
  getCategoriesWithCount: async (): Promise<
    ServiceResponse<{ id: string; name: string; slug: string; count: number }[]>
  > => {
    const { data, error } = await supabase.from('categories').select(`
        id,
        name,
        slug,
        products:products(count)
      `);

    if (error) return { data: null, error: { message: error.message } };
    const result = data.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.products?.[0]?.count || 0,
    }));
    return { data: result, error: null };
  },

  // Get all tags for filtering
  getTags: async (): Promise<ServiceResponse<{ id: string; name: string; slug: string }[]>> => {
    const { data, error } = await supabase.from('tags').select('id, name, slug').order('name');

    if (error) return { data: null, error: { message: error.message } };
    return { data, error: null };
  },

  // Get related products (same category, exclude current)
  getRelatedProducts: async (
    productId: string,
    categoryId: string,
    limit: number = 4,
  ): Promise<ServiceResponse<Product[]>> => {
    const { data, error } = await supabase
      .from('products')
      .select(
        `
        *,
        categories!products_category_id_fkey (id, name, slug),
        product_images (id, product_id, image_url, sort_order, is_primary)
      `,
      )
      .eq('category_id', categoryId)
      .neq('id', productId)
      .eq('stock_status', 'in_stock')
      .limit(limit);

    if (error) return { data: null, error: { message: error.message } };
    return { data: data.map(mapSupabaseProductToProduct), error: null };
  },

  // Get product reviews
  getProductReviews: async (
    productId: string,
    page: number = 1,
    limit: number = 5,
    sort: string = 'newest',
  ): Promise<ServiceResponse<{ reviews: ProductReview[]; total: number }>> => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('reviews')
      .select(
        `
        id,
        product_id,
        user_id,
        rating,
        comment,
        created_at,
        profiles (
          id,
          first_name,
          last_name,
          avatar_url,
          billing_first_name,
          billing_last_name
        )
      `,
        { count: 'exact' },
      )
      .eq('product_id', productId)
      .range(from, to);

    if (sort === 'highest') {
      query = query.order('rating', { ascending: false }).order('created_at', { ascending: false });
    } else if (sort === 'lowest') {
      query = query.order('rating', { ascending: true }).order('created_at', { ascending: false });
    } else {
      // default newest
      query = query.order('created_at', { ascending: false });
    }

    const { data, error, count } = await query;

    if (error) return { data: null, error: { message: error.message } };

    const reviews = data.map((item: unknown) =>
      mapSupabaseReviewToProductReview(item as SupabaseReview),
    );

    return { data: { reviews, total: count ?? 0 }, error: null };
  },
};
