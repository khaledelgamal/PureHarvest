import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@/icons/CloseIcon';
import AppLogo from '@/components/AppLogo/AppLogo';
import { routePaths } from '@/router/routePaths';
import useAuthStore from '@/store/useAuthStore';
import { useProfile } from '@/hooks/useProfile';
import UserMenu from '../../../TopBar/components/UserMenu/UserMenu';

interface MobileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: { title: string; route: string }[];
}

const MobileMenuModal = ({ isOpen, onClose, tabs }: MobileMenuModalProps) => {
  const { t } = useTranslation('layouts/AppLayout');
  const user = useAuthStore(s => s.user);
  const { data: profile } = useProfile();

  const displayName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || user?.email || '';

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('mobileMenu', 'Mobile menu')}
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header: logo + close */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to={routePaths.HOME} onClick={onClose} className="shrink-0">
            <AppLogo size="sm" />
          </Link>
          <button
            onClick={onClose}
            aria-label={t('closeMenu', 'Close menu')}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col">
            {tabs.map(tab => (
              <li key={tab.route}>
                <NavLink
                  to={tab.route}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block py-3.5 text-base font-medium border-b border-gray-100 last:border-0 transition-colors ${
                      isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`
                  }
                >
                  {tab.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-5 py-5 border-t border-gray-100 flex flex-col gap-4">
          {/* User row */}
          <div className="flex items-center justify-between gap-3">
            {/* User: avatar menu if logged in, or Sign In / Sign Up links */}
            {user ? (
              <div className="flex items-center gap-3 min-w-0">
                <UserMenu position="top-right" />
                <p className="font-semibold text-gray-900 truncate">{displayName}</p>
              </div>
            ) : (
              <div className="flex gap-2 text-sm w-full">
                <Link
                  to={routePaths.ACCOUNT.SIGNIN}
                  onClick={onClose}
                  className="flex-1 text-center px-3 py-2 rounded-md border border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-colors font-medium"
                >
                  {t('signin', 'Sign In')}
                </Link>
                <Link
                  to={routePaths.ACCOUNT.SIGNUP}
                  onClick={onClose}
                  className="flex-1 text-center px-3 py-2 rounded-md bg-primary text-white hover:bg-primary-hard transition-colors font-medium"
                >
                  {t('signup', 'Sign Up')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenuModal;
