import type { OrderStatus } from '@/services/supabase/orders/types';

export const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  received: 'text-gray-600',
  processing: 'text-warn',
  on_the_way: 'text-blue-500',
  delivered: 'text-primary',
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  received: 'Received',
  processing: 'Processing',
  on_the_way: 'On the way',
  delivered: 'Delivered',
};

export const ORDER_TABLE_COLUMNS = ['Order ID', 'Date', 'Total', 'Status', ''];
