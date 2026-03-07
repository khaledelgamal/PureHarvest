import { sectionContainer } from '@/constants/global.styles';
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
    <div className="bg-white py-6 flex items-center">
      <div className={`${sectionContainer} flex justify-between items-center`}>
        <AppLogo />
        <GlobalSearch />
        <div className="flex items-center gap-4">
          <Link
            to={routePaths.WISHLIST}
            className="w-fit"
            onMouseEnter={() => setIsWishlistHovered(true)}
            onMouseLeave={() => setIsWishlistHovered(false)}
            title="wishlist"
          >
            <WishlistIcon
              className={`w-8 h-8 transition-all ${isWishlistHovered ? 'text-danger fill-danger' : 'text-black fill-white'}`}
            />
          </Link>
          <span className="w-px h-6 bg-gray-200 block"></span>
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};
export default MainHeader;
