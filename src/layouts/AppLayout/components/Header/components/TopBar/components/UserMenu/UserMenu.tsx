import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { useSignOut } from '@/services/supabase/auth/hooks/useSignOut';

import { routePaths } from '@/router/routePaths';

import { Settings as SettingsIcon, LogOut as LogOutIcon } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore(s => s.user);
  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  const { data: profile, isLoading: isLoadingProfile } = useProfile();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Helpers ──
  const fullName = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ');

  const initials = fullName
    ? fullName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : (user?.email?.[0]?.toUpperCase() ?? '?');

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <div ref={menuRef} className="relative">
      {/* ── Avatar Trigger ── */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent cursor-pointer
                   focus:outline-none transition-all duration-300"
        title="Account settings"
      >
        {isLoadingProfile ? (
          <div className="w-full h-full bg-gray-100 animate-pulse" />
        ) : profile?.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={fullName || 'User avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full bg-primary flex-center
                          text-white font-semibold text-sm"
          >
            {initials}
          </div>
        )}
      </button>

      {/* ── Dropdown Menu ── */}
      <div
        className={`
          absolute right-0 top-[calc(100%+0.75rem)] w-64 z-50
          bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden
          transition-all duration-300
          ${
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }
        `}
      >
        {/* ── Section 1: User Info ── */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            {profile?.avatarUrl ? (
              <img src={profile.avatarUrl} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full bg-primary flex-center
                              text-white font-semibold text-sm"
              >
                {initials}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{fullName || 'Welcome!'}</p>
            <p className="text-gray-500 text-xs truncate">{user?.email}</p>
          </div>
        </div>

        {/* ── Section 2: Navigation ── */}
        <div className="py-2">
          <Link
            to={routePaths.ACCOUNT.SETTINGS.path}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm
                       text-gray-600 hover:bg-green-gray-50
                       transition-colors duration-300"
          >
            <SettingsIcon className="w-4 h-4 shrink-0" />
            Account Settings
          </Link>
        </div>

        {/* ── Section 3: Logout ── */}
        <div className="border-t border-gray-100 py-2">
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer
                       text-danger hover:bg-red-50 transition-colors duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOutIcon className="w-4 h-4 shrink-0" />
            {isSigningOut ? 'Signing out...' : 'Log out'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserMenu;
