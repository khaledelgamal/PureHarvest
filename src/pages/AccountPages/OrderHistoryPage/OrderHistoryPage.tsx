import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import { ordersAPI } from '@/services/supabase/orders/api';
import { orderKeys } from '@/services/supabase/orders/keys';
import { OrdersTable } from '../components/OrdersTable/OrdersTable';

const ORDERS_PER_PAGE = 10;

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
      <OrdersTable
        orders={data?.orders}
        isLoading={isLoading}
        skeletonRows={ORDERS_PER_PAGE}
        emptyMessage="You haven't placed any orders yet."
        monthFormat="long"
        actionSize="sm"
      />

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 px-6 py-5 border-t border-gray-100">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="cursor-pointer w-8 h-8 flex-center rounded-full border border-gray-200
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
                className={`cursor-pointer w-8 h-8 flex-center rounded-full text-sm font-medium
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
            className="cursor-pointer w-8 h-8 flex-center rounded-full border border-gray-200
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
