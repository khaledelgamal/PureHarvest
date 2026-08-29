import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import AppLogo from '../../../AppLogo/AppLogo';
import GlobalSearch from './components/GlobalSearch/GlobalSearch';
import WishlistIcon from '@/icons/WishlistIcon';
import { Link } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import { useState } from 'react';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

const MainHeader = () => {
  const [isWishlistHovered, setIsWishlistHovered] = useState(false);

  return (
    <div className="bg-white py-4 sm:py-6 flex items-center border-b border-gray-100 sm:border-b-0">
      <div
        className={`${sectionContainer} ${sectionPaddingX} flex flex-col flex-wrap sm:flex-row justify-between items-center w-full gap-4 sm:gap-0`}
      >
        {/* Logo - Centered on mobile */}
        <Link to={routePaths.HOME} className=" hidden lg:flex justify-center w-full sm:w-auto">
          <AppLogo />
        </Link>

        {/* Search and Icons - Same line on mobile */}
        <div className="flex flex-col sm:flex-row  items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-initial">
            <GlobalSearch />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link
              to={routePaths.WISHLIST}
              className="w-fit"
              onMouseEnter={() => setIsWishlistHovered(true)}
              onMouseLeave={() => setIsWishlistHovered(false)}
              title="wishlist"
            >
              <WishlistIcon
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-all ${isWishlistHovered ? 'text-danger fill-danger' : 'text-black fill-white'}`}
              />
            </Link>
            <span className="w-px h-6 bg-gray-200 hidden sm:block"></span>
            <ShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
