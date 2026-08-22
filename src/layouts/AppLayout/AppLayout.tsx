import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ShoppingCartDrawer from './components/ShoppingCartDrawer/ShoppingCartDrawer';
import BreadCrumb from './components/BreadCrumb/BreadCrumb';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <BreadCrumb />
      <main>
        <Outlet />
      </main>

      <Footer />
      <ShoppingCartDrawer />
    </div>
  );
}
