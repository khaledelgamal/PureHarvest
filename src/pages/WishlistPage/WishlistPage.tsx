import {
  FacebookButton,
  InstagramButton,
  PinterestButton,
  TwitterButton,
} from '@/components/Buttons/SocialButton/SocialButton';
import { sectionContainer } from '@/constants/global.styles';
import WishlistTable from './components/WishlistTable/WishlistTable';
import { useTranslation } from 'react-i18next';

const WishlistPage = () => {
  const { t } = useTranslation('pages/WishlistPage');

  return (
    <div className={sectionContainer}>
      <h3 className="font-semibold text-3xl my-8 text-center">{t('title', 'My Wishlist')}</h3>

      <WishlistTable />

      <div className="flex items-center justify-start border border-gray-100 rounded-b-lg p-6 mb-4">
        <p className="text-sm">{t('share', 'Share:')}</p>
        <FacebookButton href="https://www.facebook.com/" />
        <TwitterButton href="https://twitter.com/" />
        <PinterestButton href="https://www.pinterest.com/" />
        <InstagramButton href="https://www.instagram.com/" />
      </div>
    </div>
  );
};
export default WishlistPage;
