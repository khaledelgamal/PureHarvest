import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main>
        <div className="min-h-[calc(100vh-8rem)]">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
