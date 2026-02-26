import { Outlet } from 'react-router-dom';
import { sectionPaddingX } from '@/constants/global.styles';
import Header from './components/Header/Header';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className={` ${sectionPaddingX}`}>
        <div className="min-h-[calc(100vh-8rem)]">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-200">
        {/* TODO: Footer */}
        <div className={`flex h-16 items-center`}>Footer</div>
      </footer>
    </div>
  );
}
