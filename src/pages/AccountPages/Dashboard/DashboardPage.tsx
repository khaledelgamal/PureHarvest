import { useQuery } from '@tanstack/react-query';
import { MapPin, Mail, Phone } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import { profilesAPI } from '@/services/supabase/profiles/api';
import { profileKeys } from '@/services/supabase/profiles/keys';
import { ordersAPI } from '@/services/supabase/orders/api';
import { orderKeys } from '@/services/supabase/orders/keys';
import { routePaths } from '@/router/routePaths';
import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import type { OrderStatus } from '@/services/supabase/orders/types';

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
    month: 'short',
    year: 'numeric',
  });

export default function DashboardPage() {
  const user = useAuthStore(s => s.user);

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: profileKeys.profile(user?.id ?? ''),
    queryFn: async () => {
      const { data, error } = await profilesAPI.getProfile(user!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });

  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: orderKeys.recent(user?.id ?? ''),
    queryFn: async () => {
      const { data, error } = await ordersAPI.getRecentOrders(user!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });

  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ');

  const billingFullName = [profile?.billing?.firstName, profile?.billing?.lastName]
    .filter(Boolean)
    .join(' ');

  const billingAddress = [
    profile?.billing?.streetAddress,
    profile?.billing?.state,
    profile?.billing?.country,
    profile?.billing?.zipCode,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="space-y-6">
      {/* ── Top Cards ── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Profile Card */}
        <div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm
                        flex flex-col items-center justify-center gap-3 py-8"
        >
          {profileLoading ? (
            <div className="w-24 h-24 rounded-full bg-gray-100 animate-pulse" />
          ) : profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={fullName}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-green-gray-100"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full bg-primary flex-center
                            text-white text-2xl font-bold ring-4 ring-green-gray-100"
            >
              {fullName?.[0]?.toUpperCase() ?? '?'}
            </div>
          )}

          <div className="text-center">
            <h3 className="font-semibold text-gray-900 text-lg">
              {profileLoading ? (
                <span className="block w-32 h-5 bg-gray-100 rounded animate-pulse mx-auto" />
              ) : (
                fullName || 'Your Name'
              )}
            </h3>
            <p className="text-gray-500 text-sm mt-1">Customer</p>
          </div>

          <ButtonLink to={routePaths.ACCOUNT.SETTINGS.path} variant="text" size="md">
            Edit Profile
          </ButtonLink>
        </div>

        {/* Billing Address Card */}
        <div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6
                        flex flex-col"
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Billing Address
          </p>

          {profileLoading ? (
            <div className="space-y-3 flex-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              <h4 className="font-semibold text-gray-900">{billingFullName || '—'}</h4>

              {billingAddress && (
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                  {billingAddress}
                </div>
              )}

              {profile?.billing?.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 shrink-0 text-gray-400" />
                  {profile.billing.email}
                </div>
              )}

              {profile?.billing?.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 shrink-0 text-gray-400" />
                  {profile.billing.phone}
                </div>
              )}

              {!billingFullName && !billingAddress && (
                <p className="text-sm text-gray-400">No billing address yet.</p>
              )}
            </div>
          )}

          <ButtonLink to={routePaths.ACCOUNT.SETTINGS.path} variant="text" size="md">
            Edit Address
          </ButtonLink>
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Order History</h3>
          <ButtonLink to={routePaths.ACCOUNT.ORDER_HISTORY.path} variant="text" size="md">
            View All
          </ButtonLink>
        </div>

        {/* Table */}
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
              {ordersLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : recentOrders?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                recentOrders?.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      #{order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      ${order.total.toFixed(2)}
                      <span className="text-gray-400 ml-1">
                        ({order.itemCount} {order.itemCount === 1 ? 'Product' : 'Products'})
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={statusStyles[order.status]}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ButtonLink
                        to={routePaths.ACCOUNT.ORDER_HISTORY.ORDER_DETAILS.path(order.id)}
                        variant="text"
                        size="md"
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
      </div>
    </div>
  );
}
