import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { routePaths } from '@/router/routePaths';
import { ORDER_STATUS_STYLES } from './ordersTable.constants';
import type { OrderListItem, OrderStatus } from '@/services/supabase/orders/types';
import { useTranslation } from 'react-i18next';

interface OrdersTableProps {
  orders?: OrderListItem[];
  isLoading: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
  monthFormat?: 'short' | 'long';
  actionSize?: 'sm' | 'md';
  className?: string;
  namespace?: string;
}

const formatDate = (dateStr: string, month: 'short' | 'long') =>
  new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month,
    year: 'numeric',
  });

export function OrdersTable({
  orders,
  isLoading,
  skeletonRows = 5,
  emptyMessage = 'No orders yet.',
  monthFormat = 'short',
  actionSize = 'md',
  className = '',
  namespace = 'pages/AccountPages/DashboardPage',
}: OrdersTableProps) {
  const { t } = useTranslation(namespace);

  const columns = [
    t('thOrder', 'ORDER'),
    t('thDate', 'DATE'),
    t('thTotal', 'TOTAL'),
    t('thStatus', 'STATUS'),
    t('thAction', 'ACTION'),
  ];

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return t('statusReceived', 'Received');
      case 'processing':
        return t('statusProcessing', 'Processing');
      case 'on_the_way':
        return t('statusOnTheWay', 'On the way');
      case 'delivered':
        return t('statusDelivered', 'Delivered');
      default:
        return status;
    }
  };

  return (
    <div className={`overflow-x-auto h-[500px] ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map(col => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-semibold
                             text-gray-400 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            [...Array(skeletonRows)].map((_, i) => (
              <tr key={i}>
                {[...Array(5)].map((_, j) => (
                  <td key={j} className="px-6 py-4">
                    <div className="h-6 bg-gray-100 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : orders?.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            orders?.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  #{order.orderNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(order.orderDate, monthFormat)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${order.totalAmount.toFixed(2)}
                  <span className="text-gray-400 ml-1">
                    (
                    {order.productsCount === 1
                      ? t('product', '1 Product', { count: 1 })
                      : t('products', '{{count}} Products', { count: order.productsCount })}
                    )
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={ORDER_STATUS_STYLES[order.status]}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ButtonLink
                    to={routePaths.ACCOUNT.ORDER_HISTORY.ORDER_DETAILS.path(order.id)}
                    variant="text"
                    size={actionSize}
                  >
                    {t('viewDetails', 'View Details')}
                  </ButtonLink>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
