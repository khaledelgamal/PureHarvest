import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { routePaths } from '@/router/routePaths';
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STYLES,
  ORDER_TABLE_COLUMNS,
} from './ordersTable.constants';
import type { Order } from '@/services/supabase/orders/types';

interface OrdersTableProps {
  orders?: Order[];
  isLoading: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
  monthFormat?: 'short' | 'long';
  actionSize?: 'sm' | 'md';
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
}: OrdersTableProps) {
  return (
    <div className="overflow-x-auto h-[500px]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {ORDER_TABLE_COLUMNS.map(col => (
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
                  {formatDate(order.createdAt, monthFormat)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${order.total.toFixed(2)}
                  <span className="text-gray-400 ml-1">
                    ({order.itemCount} {order.itemCount === 1 ? 'Product' : 'Products'})
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={ORDER_STATUS_STYLES[order.status]}>
                    {ORDER_STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <ButtonLink
                    to={routePaths.ACCOUNT.ORDER_HISTORY.ORDER_DETAILS.path(order.id)}
                    variant="text"
                    size={actionSize}
                  >
                    View Details
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
