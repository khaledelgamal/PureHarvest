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

  createOrder: async (payload: {
    userId: string;
    subtotal: number;
    shippingCost: number;
    total: number;
    paymentMethod: PaymentMethod;
    notes?: string;
    billing: any;
    shipping: any;
    items: {
      productId: string;
      productName: string;
      productImage: string | null;
      price: number;
      quantity: number;
      subtotal: number;
    }[];
  }): Promise<ServiceResponse<Order>> => {
    const orderData = {
      user_id: payload.userId,
      status: 'received' as const,
      subtotal: payload.subtotal,
      shipping_cost: payload.shippingCost,
      discount_percentage: 0,
      total: payload.total,
      payment_method: payload.paymentMethod,
      notes: payload.notes || null,
      billing_first_name: payload.billing.firstName,
      billing_last_name: payload.billing.lastName,
      billing_street_address: payload.billing.address,
      billing_country: payload.billing.country,
      billing_state: payload.billing.state,
      billing_zip_code: payload.billing.zipCode,
      billing_email: payload.billing.email,
      billing_phone: payload.billing.phone,
      shipping_first_name: payload.shipping.firstName,
      shipping_last_name: payload.shipping.lastName,
      shipping_street_address: payload.shipping.address,
      shipping_country: payload.shipping.country,
      shipping_state: payload.shipping.state,
      shipping_zip_code: payload.shipping.zipCode,
      shipping_email: payload.shipping.email,
      shipping_phone: payload.shipping.phone,
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select('id')
      .single();

    if (orderError) return { data: null, error: { message: orderError.message } };

    const orderItemsData = payload.items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      product_image: item.productImage,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (itemsError) return { data: null, error: { message: itemsError.message } };

    return ordersAPI.getOrderById(order.id);
  },
};
