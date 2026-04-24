import { supabase } from '../client';
import { mapSupabaseOrderListItem, mapSupabaseOrderToOrder } from './adapters';
import type { Order, OrderListItem } from './types';
import type { ServiceResponse } from '../types';

const ORDERS_PER_PAGE = 10;

export const ordersAPI = {
  // ── For Dashboard: last 5 orders ──
  // Returns: id, order_number, order_date, total_amount, status
  getRecentOrders: async (userId: string): Promise<ServiceResponse<OrderListItem[]>> => {
    const { data, error } = await supabase
      .from('orders')
      .select('id, order_number, created_at, total, status, order_items(count)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) return { data: null, error: { message: error.message } };
    return { data: data.map(mapSupabaseOrderListItem), error: null };
  },

  getOrders: async (
    userId: string,
    page: number = 1,
  ): Promise<ServiceResponse<{ orders: OrderListItem[]; total: number }>> => {
    const from = (page - 1) * ORDERS_PER_PAGE;
    const to = from + ORDERS_PER_PAGE - 1;

    const { data, error, count } = await supabase
      .from('orders')
      .select('id, order_number, created_at, total, status, order_items(count)', { count: 'exact' }) // ← Added order_items(count)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) return { data: null, error: { message: error.message } };
    return {
      data: {
        orders: data.map(mapSupabaseOrderListItem),
        total: count ?? 0,
      },
      error: null,
    };
  },

  getOrderById: async (orderId: string): Promise<ServiceResponse<Order>> => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items( *, product:products ( id, name, image_url ) )')
      .eq('id', orderId)
      .single();

    if (error) return { data: null, error: { message: error.message } };
    return { data: mapSupabaseOrderToOrder(data), error: null };
  },
};
