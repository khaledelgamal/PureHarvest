import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import AppLogo from '@/components/AppLogo/AppLogo';
import GlobalSearch from './components/GlobalSearch/GlobalSearch';
import WishlistIcon from '@/icons/WishlistIcon';
import { Link } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import { useState } from 'react';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

const MainHeader = () => {
  const [isWishlistHovered, setIsWishlistHovered] = useState(false);

  return (
    <div className="hidden lg:flex bg-white py-6 items-center border-b border-gray-100">
      <div
        className={`${sectionContainer} ${sectionPaddingX} flex items-center justify-between gap-8 w-full`}
      >
        {/* Logo */}
        <Link to={routePaths.HOME} className="flex items-center shrink-0">
          <AppLogo />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-[520px]">
          <GlobalSearch />
        </div>

        {/* Wishlist + Cart */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to={routePaths.WISHLIST}
            onMouseEnter={() => setIsWishlistHovered(true)}
            onMouseLeave={() => setIsWishlistHovered(false)}
            title="Wishlist"
          >
            <WishlistIcon
              className={`w-8 h-8 transition-all ${isWishlistHovered ? 'text-danger fill-danger' : 'text-black fill-white'}`}
            />
          </Link>
          <span className="w-px h-6 bg-gray-200" />
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
