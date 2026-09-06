import TobBar from './components/TopBar/TobBar';
import MainHeader from './components/MainHeader/MainHeader';
import Navbar from './components/Navbar/Navbar';
import MobileHeader from './components/MobileHeader/MobileHeader';

const Header = () => {
  return (
    <div>
      {/* Mobile-only top bar: hamburger | logo | cart */}
      <MobileHeader />

      {/* Desktop top info bar */}
      <TobBar />

      {/* Desktop search + logo + wishlist/cart row */}
      <MainHeader />

      {/* Desktop navbar */}
      <Navbar />
    </div>
  );
};
export default Header;
