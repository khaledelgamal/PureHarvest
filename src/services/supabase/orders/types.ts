export type OrderStatus = 'received' | 'processing' | 'on_the_way' | 'delivered';
export type PaymentMethod = 'cod' | 'paypal' | 'amazon_pay';

export interface OrderAddress {
  firstName: string | null;
  lastName: string | null;
  streetAddress: string | null;
  country: string | null;
  state: string | null;
  zipCode: string | null;
  email: string | null;
  phone: string | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string | null;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: number;
  status: OrderStatus;
  billing: OrderAddress;
  shipping: OrderAddress;
  subtotal: number;
  discountPercentage: number;
  shippingCost: number;
  total: number;
  paymentMethod: PaymentMethod;
  notes: string | null;
  couponId: string | null;
  itemCount: number; // derived from order_items length
  items: OrderItem[]; // empty [] when not fetched
  createdAt: string;
  updatedAt: string;
}
