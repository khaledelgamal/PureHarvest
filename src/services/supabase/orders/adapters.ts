import type { Order, OrderItem, OrderListItem, OrderStatus, PaymentMethod } from './types';

// ── List View Interface ──
interface SupabaseOrderListItem {
  id: string;
  order_number: number;
  created_at: string;
  total: number;
  status: OrderStatus;
  order_items: { count: number }[];
}

// ── Detail View Interfaces ──
interface SupabaseOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
  subtotal: number;
  product: {
    id: string;
    name: string;
    image_url: string;
  };
}

interface SupabaseOrder {
  id: string;
  user_id: string;
  order_number: number;
  status: OrderStatus;
  billing_first_name: string | null;
  billing_last_name: string | null;
  billing_street_address: string | null;
  billing_country: string | null;
  billing_state: string | null;
  billing_zip_code: string | null;
  billing_email: string | null;
  billing_phone: string | null;
  shipping_first_name: string | null;
  shipping_last_name: string | null;
  shipping_street_address: string | null;
  shipping_country: string | null;
  shipping_state: string | null;
  shipping_zip_code: string | null;
  shipping_email: string | null;
  shipping_phone: string | null;
  subtotal: number;
  discount_percentage: number;
  shipping_cost: number;
  total: number;
  payment_method: PaymentMethod;
  notes: string | null;
  coupon_id: string | null;
  created_at: string;
  updated_at: string;
  order_items?: SupabaseOrderItem[];
}

// ── List Mapper (5 fields only) ──
export const mapSupabaseOrderListItem = (raw: SupabaseOrderListItem): OrderListItem => ({
  id: raw.id,
  orderNumber: raw.order_number,
  orderDate: raw.created_at,
  totalAmount: Number(raw.total),
  status: raw.status,
  productsCount: raw.order_items?.[0]?.count ?? 0,
});

// ── Detail Mappers (full data with products) ──
export const mapSupabaseOrderItemToOrderItem = (raw: SupabaseOrderItem): OrderItem => ({
  id: raw.id,
  orderId: raw.order_id,
  productId: raw.product_id,
  productName: raw.product.name,
  productImage: raw.product.image_url,
  price: Number(raw.price),
  quantity: raw.quantity,
  subtotal: Number(raw.subtotal),
});

export const mapSupabaseOrderToOrder = (raw: SupabaseOrder): Order => ({
  id: raw.id,
  userId: raw.user_id,
  orderNumber: raw.order_number,
  status: raw.status,
  billing: {
    firstName: raw.billing_first_name,
    lastName: raw.billing_last_name,
    streetAddress: raw.billing_street_address,
    country: raw.billing_country,
    state: raw.billing_state,
    zipCode: raw.billing_zip_code,
    email: raw.billing_email,
    phone: raw.billing_phone,
  },
  shipping: {
    firstName: raw.shipping_first_name,
    lastName: raw.shipping_last_name,
    streetAddress: raw.shipping_street_address,
    country: raw.shipping_country,
    state: raw.shipping_state,
    zipCode: raw.shipping_zip_code,
    email: raw.shipping_email,
    phone: raw.shipping_phone,
  },
  subtotal: Number(raw.subtotal),
  discountPercentage: Number(raw.discount_percentage),
  shippingCost: Number(raw.shipping_cost),
  total: Number(raw.total),
  paymentMethod: raw.payment_method,
  notes: raw.notes,
  couponId: raw.coupon_id,
  itemCount: raw.order_items?.length ?? 0,
  items: raw.order_items?.map(mapSupabaseOrderItemToOrderItem) ?? [],
  createdAt: raw.created_at,
  updatedAt: raw.updated_at,
});
