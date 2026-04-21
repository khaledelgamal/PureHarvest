import { LayoutDashboard, History, Settings } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';

const navItems = [
  {
    label: 'Dashboard',
    path: routePaths.ACCOUNT.DASHBOARD.path,
    icon: LayoutDashboard,
  },
  {
    label: 'Order History',
    path: routePaths.ACCOUNT.ORDER_HISTORY.path,
    icon: History,
  },
  {
    label: 'Settings',
    path: routePaths.ACCOUNT.SETTINGS.path,
    icon: Settings,
  },
];

export default function AccountLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* ── Sidebar ── */}
        <aside className="w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-lg">Navigation</h2>
            </div>

            <nav className="py-3">
              {navItems.map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-3 text-sm transition-colors duration-300
                    ${
                      isActive
                        ? 'text-primary bg-green-gray-50 border-l-2 border-primary font-medium'
                        : 'text-gray-500 hover:text-gray-900 border-l-2 border-transparent'
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
