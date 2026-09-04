import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { routePaths } from '@/router/routePaths';
import { ordersAPI } from '@/services/supabase/orders/api';
import { orderKeys } from '@/services/supabase/orders/keys';
import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { OrderProgressTracker } from './components/OrderProgressTracker/OrderProgressTracker';
import { OrderProductsTable } from './components/OrderProductsTable/OrderProductsTable';
import { OrderSummaryCard } from './components/OrderSummaryCard/OrderSummaryCard';
import { AddressCard } from './components/AddressCard/AddressCard';
import OrderDetailsPageSkeleton from './OrderDetailsPageSekeleton/OrderDetailsPageSekeleton';
import { useTranslation } from 'react-i18next';

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function OrderDetailsPage() {
  const { t } = useTranslation('pages/AccountPages/OrderDetailsPage');
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading } = useQuery({
    queryKey: orderKeys.detail(orderId ?? ''),
    queryFn: async () => {
      const { data, error } = await ordersAPI.getOrderById(orderId!);
      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <OrderDetailsPageSkeleton />;
  }

  if (!order) {
    return (
      <div
        className="bg-white rounded-2xl border border-gray-100 shadow-sm
                      p-16 text-center text-gray-400"
      >
        {t('orderNotFound', 'Order not found.')}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <h2 className="font-medium text-gray-900 text-lg sm:text-xl">
            {t('orderDetails', 'Order Details')}
          </h2>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 text-xs sm:text-sm">{formatDate(order.createdAt)}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 text-xs sm:text-sm">
            {order.itemCount === 1
              ? t('product', '1 Product', { count: 1 })
              : t('products', '{{count}} Products', { count: order.itemCount })}
          </span>
        </div>

        <ButtonLink to={routePaths.ACCOUNT.ORDER_HISTORY.path} variant="text" size="md">
          {t('backToList', 'Back to List')}
        </ButtonLink>
      </div>

      {/* ── Addresses + Summary ── */}
      <div className="bg-white flex flex-col xl:flex-row gap-6 px-4 sm:px-6 pt-6">
        <div className="rounded-md border border-gray-100 w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {/* Billing Address */}
          <AddressCard title={t('billingAddress', 'Billing Address')} address={order.billing} />

          {/* Shipping Address */}
          <AddressCard title={t('shippingAddress', 'Shipping Address')} address={order.shipping} />
        </div>
        {/* Order Summary */}
        <OrderSummaryCard
          orderNumber={order.orderNumber}
          paymentMethod={order.paymentMethod}
          subtotal={order.subtotal}
          discountPercentage={order.discountPercentage}
          shippingCost={order.shippingCost}
          total={order.total}
        />
      </div>

      {/* ── Progress Tracker ── */}
      <div className="px-4 sm:px-8 lg:px-12 py-5 sm:py-7 overflow-x-auto">
        <div className="min-w-[480px]">
          <OrderProgressTracker status={order.status} />
        </div>
      </div>

      {/* ── Products Table ── */}
      <OrderProductsTable items={order.items} />
    </div>
  );
}
