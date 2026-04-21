import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import { ordersAPI } from '@/services/supabase/orders/api';
import { orderKeys } from '@/services/supabase/orders/keys';
import { routePaths } from '@/router/routePaths';
import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import type { OrderStatus } from '@/services/supabase/orders/types';

const ORDERS_PER_PAGE = 10;

const statusStyles: Record<OrderStatus, string> = {
  received: 'text-gray-600',
  processing: 'text-warn',
  on_the_way: 'text-blue-500',
  delivered: 'text-primary',
};

const statusLabels: Record<OrderStatus, string> = {
  received: 'Received',
  processing: 'Processing',
  on_the_way: 'On the way',
  delivered: 'Delivered',
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function OrderHistoryPage() {
  const [page, setPage] = useState(1);
  const user = useAuthStore(s => s.user);

  const { data, isLoading } = useQuery({
    queryKey: orderKeys.list(user?.id ?? '', page),
    queryFn: async () => {
      const { data, error } = await ordersAPI.getOrders(user!.id, page);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });

  const totalPages = Math.ceil((data?.total ?? 0) / ORDERS_PER_PAGE);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Header ── */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-lg">Order History</h3>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Order ID', 'Date', 'Total', 'Status', ''].map(col => (
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
              [...Array(ORDERS_PER_PAGE)].map((_, i) => (
                <tr key={i}>
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data?.orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                  You haven't placed any orders yet.
                </td>
              </tr>
            ) : (
              data?.orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    #{order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(order.createdAt)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${order.total.toFixed(2)}
                    <span className="text-gray-400 ml-1">
                      ({order.itemCount} {order.itemCount === 1 ? 'Product' : 'Products'})
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={statusStyles[order.status]}>{statusLabels[order.status]}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ButtonLink
                      to={routePaths.ACCOUNT.ORDER_HISTORY.ORDER_DETAILS.path(order.id)}
                      variant="text"
                      size="sm"
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

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 px-6 py-5 border-t border-gray-100">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex-center rounded-full border border-gray-200
                       text-gray-500 hover:border-primary hover:text-primary
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`w-8 h-8 flex-center rounded-full text-sm font-medium
                            transition-colors duration-300
                            ${
                              page === pageNum
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:text-primary'
                            }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex-center rounded-full border border-gray-200
                       text-gray-500 hover:border-primary hover:text-primary
                       disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
