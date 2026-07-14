import {
  FacebookButton,
  InstagramButton,
  PinterestButton,
  TwitterButton,
} from '@/components/Buttons/SocialButton/SocialButton';
import { sectionContainer } from '@/constants/global.styles';
import WishlistTable from './components/WishlistTable/WishlistTable';

const WishlistPage = () => {
  return (
    <div className={sectionContainer}>
      <h3 className="font-semibold text-3xl my-8 text-center">My Wishlist</h3>

      <WishlistTable />

      <div className="flex items-center justify-start border border-gray-100 rounded-b-lg p-6 mb-4">
        <p className="text-sm">Share:</p>
        <FacebookButton />
        <TwitterButton />
        <PinterestButton />
        <InstagramButton />
      </div>
    </div>
  );
};
export default WishlistPage;
