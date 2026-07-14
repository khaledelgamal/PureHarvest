import { supabase } from '../client';
import { mapSupabaseProductToProduct } from '../products/adapters';
import type { Wishlists } from './types';
import type { ServiceResponse } from '../types';

export const wishlistsAPI = {
  // Get user's wishlist
  getWishlist: async (
    userId: string,
    options?: { page?: number },
  ): Promise<ServiceResponse<Wishlists>> => {
    const page = options?.page || 1;
    const limit = 5;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
      .from('wishlists')
      .select(
        `
        user_id,
        product_id,
        created_at,
        products (
          id,
          name,
          slug,
          sku,
          description,
          short_description,
          price,
          sale_price,
          stock_status,
          stock_quantity,
          weight,
          color,
          type,
          category_id,
          brand_id,
          rating_avg,
          rating_count,
          is_featured,
          deal_expires_at,
          image_url,
          created_at,
          updated_at,
          categories (id, name, slug),
          brands (id, name, slug),
          product_images (id, product_id, image_url, sort_order, is_primary),
          product_tags (tags (id, name, slug))
        )
      `,
        { count: 'exact' },
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) return { data: null, error: { message: error.message } };

    const mappedData = (data || []).map((item: any) => ({
      userId: item.user_id,
      productId: item.product_id,
      createdAt: item.created_at,
      product: item.products ? mapSupabaseProductToProduct(item.products) : undefined,
    }));

    return { data: { items: mappedData, total: count || 0 }, error: null };
  },

  // Add product to wishlist
  addToWishlist: async (userId: string, productId: string): Promise<ServiceResponse<null>> => {
    const { error } = await supabase
      .from('wishlists')
      .insert({ user_id: userId, product_id: productId });

    if (error) return { data: null, error: { message: error.message } };
    return { data: null, error: null };
  },

  // Remove product from wishlist
  removeFromWishlist: async (userId: string, productId: string): Promise<ServiceResponse<null>> => {
    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) return { data: null, error: { message: error.message } };
    return { data: null, error: null };
  },

  // Check if product is in wishlist
  checkInWishlist: async (userId: string, productId: string): Promise<ServiceResponse<boolean>> => {
    const { count, error } = await supabase
      .from('wishlists')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) return { data: null, error: { message: error.message } };
    return { data: count ? count > 0 : false, error: null };
  },
};
