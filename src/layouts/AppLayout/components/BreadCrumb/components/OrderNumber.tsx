import { useQuery } from '@tanstack/react-query';
import { orderKeys } from '@/services/supabase/orders/keys';
import { ordersAPI } from '@/services/supabase/orders/api';

interface OrderNumberProps {
  orderId: string;
}

export function OrderNumber({ orderId }: OrderNumberProps) {
  const { data: order, isLoading } = useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: async () => {
      const { data, error } = await ordersAPI.getOrderById(orderId);
      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <span className="inline-block h-4 w-24 animate-pulse rounded bg-white/30" />;
  }

  return <span>{order ? `Order #${order.orderNumber}` : orderId}</span>;
}
