import { supabase } from '../client';
import { mapSupabaseOrderToOrder } from './adapters';
import type { Order } from './types';
import type { ServiceResponse } from '../types';

const ORDERS_PER_PAGE = 10;

export const ordersAPI = {
  // ── For Dashboard: last 5 orders ──
  getRecentOrders: async (userId: string): Promise<ServiceResponse<Order[]>> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) return { data: null, error: { message: error.message } };
    return { data: data.map(mapSupabaseOrderToOrder), error: null };
  },

  // ── For Order History: paginated ──
  getOrders: async (
    userId: string,
    page: number = 1,
  ): Promise<ServiceResponse<{ orders: Order[]; total: number }>> => {
    const from = (page - 1) * ORDERS_PER_PAGE;
    const to = from + ORDERS_PER_PAGE - 1;

    const { data, error, count } = await supabase
      .from('orders')
      .select('*, order_items(*)', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) return { data: null, error: { message: error.message } };
    return {
      data: {
        orders: data.map(mapSupabaseOrderToOrder),
        total: count ?? 0,
      },
      error: null,
    };
  },

  // ── For Order Details ──
  getOrderById: async (orderId: string): Promise<ServiceResponse<Order>> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single();

    if (error) return { data: null, error: { message: error.message } };
    return { data: mapSupabaseOrderToOrder(data), error: null };
  },
};
