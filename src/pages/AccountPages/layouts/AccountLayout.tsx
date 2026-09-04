import { LayoutDashboard, History, Settings } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';
import { sectionContainer, sectionPaddingX, sectionPaddingY } from '@/constants/global.styles';

export default function AccountLayout() {
  const { t } = useTranslation('pages/AccountPages/DashboardPage');

  const navItems = [
    {
      label: t('dashboard', 'Dashboard'),
      path: routePaths.ACCOUNT.DASHBOARD.path,
      icon: LayoutDashboard,
    },
    {
      label: t('orderHistory', 'Order History'),
      path: routePaths.ACCOUNT.ORDER_HISTORY.path,
      icon: History,
    },
    {
      label: t('settings', 'Settings'),
      path: routePaths.ACCOUNT.SETTINGS.path,
      icon: Settings,
    },
  ];

  return (
    <div className={`bg-gray-50 ${sectionPaddingY}`}>
      <div className={`${sectionContainer} ${sectionPaddingX} flex flex-col lg:flex-row gap-6`}>
        {/* ── Sidebar / Navigation ── */}
        <aside className="w-full lg:w-64 lg:shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden lg:block px-6 py-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-lg">
                {t('navigation', 'Navigation')}
              </h2>
            </div>

            <nav className="flex lg:flex-col overflow-x-auto py-1.5 lg:py-3 lg:divide-x-0 divide-gray-100">
              {navItems.map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-3 text-sm whitespace-nowrap transition-colors duration-300
                    ${
                      isActive
                        ? 'text-primary lg:bg-green-gray-50 border-b-2 lg:border-b-0 lg:border-l-2 border-primary font-medium'
                        : 'text-gray-500 hover:text-gray-900 border-b-2 lg:border-b-0 lg:border-l-2 border-transparent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Page Content ── */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
