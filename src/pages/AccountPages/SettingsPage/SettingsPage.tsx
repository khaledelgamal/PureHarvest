import { AccountSettingsSection } from './components/AccountSettingsSection/AccountSettingsSection';
import { BillingAddressSection } from './components/BillingAddressSection/BillingAddressSection';
import { ChangePasswordSection } from './components/ChangePasswordSection/ChangePasswordSection';
import { useProfile } from '@/hooks/useProfile';

export default function SettingsPage() {
  const { data: profile, isLoading: isLoadingProfile, isError, refetch } = useProfile();

  if (isLoadingProfile) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
          >
            <div className="h-6 w-40 bg-gray-100 rounded animate-pulse" />
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-12 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center gap-4 text-center">
        <p className="text-gray-800 font-semibold">Failed to load your profile</p>
        <p className="text-gray-500 text-sm">Something went wrong. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:opacity-90 transition"
        >
          Retry
        </button>
      </div>
    );
  }
  if (!profile) return null;

  return (
    <div className="space-y-6">
      <AccountSettingsSection profile={profile} isLoadingProfile={isLoadingProfile} />
      <BillingAddressSection profile={profile} />
      <ChangePasswordSection />
    </div>
  );
}
