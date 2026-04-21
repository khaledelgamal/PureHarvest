import { useQuery } from '@tanstack/react-query';
import { MapPin, Mail, Phone } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import { profilesAPI } from '@/services/supabase/profiles/api';
import { profileKeys } from '@/services/supabase/profiles/keys';
import { ordersAPI } from '@/services/supabase/orders/api';
import { orderKeys } from '@/services/supabase/orders/keys';
import { routePaths } from '@/router/routePaths';
import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { OrdersTable } from '../components/OrdersTable/OrdersTable';

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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Recent Order History</h3>
          <ButtonLink to={routePaths.ACCOUNT.ORDER_HISTORY.path} variant="text" size="md">
            View All
          </ButtonLink>
        </div>

        <OrdersTable
          orders={recentOrders}
          isLoading={ordersLoading}
          skeletonRows={5}
          emptyMessage="No orders yet."
          monthFormat="short"
          actionSize="md"
        />
      </div>
    </div>
  );
}
