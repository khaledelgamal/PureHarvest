import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
