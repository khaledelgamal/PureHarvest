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

// ── For List Views (minimal data) ──
export interface OrderListItem {
  id: string;
  orderNumber: number;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
  productsCount: number;
}

// ── For Detail View (full data with products) ──
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
  itemCount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
