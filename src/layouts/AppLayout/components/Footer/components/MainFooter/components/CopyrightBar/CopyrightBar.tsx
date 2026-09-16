import {
  FacebookButton,
  TwitterButton,
  PinterestButton,
  InstagramButton,
} from '@/components/Buttons/SocialButton/SocialButton';
import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import LangDropdown from '@/layouts/AppLayout/components/Header/components/TopBar/components/LangDropdown/LangDropdown';
import { useTranslation } from 'react-i18next';

const paymentMethods = [
  '/images/ApplePay.webp',
  '/images/visa-logo.webp',
  '/images/Discover.webp',
  '/images/Mastercard.webp',
  '/images/SecurePayment.webp',
];

const CopyrightBar = () => {
  const { t } = useTranslation('layouts/AppLayout');

  return (
    <div className="relative z-10">
      <div
        className={`${sectionContainer} ${sectionPaddingX} border-t border-gray-700 flex flex-col md:flex-row items-center justify-between py-5 gap-4`}
      >
        <div className="flex items-center gap-3">
          <FacebookButton href="https://www.facebook.com/" />
          <TwitterButton href="https://twitter.com/" />
          <PinterestButton href="https://www.pinterest.com/" />
          <InstagramButton href="https://www.instagram.com/" />
        </div>

        <p className="text-gray-500 text-sm">
          {t('copyrightText', 'PureHarvest eCommerce © {{year}}. All Rights Reserved', {
            year: new Date().getFullYear(),
          })}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ul className="w-full flex flex-wrap justify-center items-center gap-4">
            {/* Lang switcher — only shown on < lg (TopBar handles it on lg+) */}
            <li className="lg:hidden">
              <LangDropdown position="top" />
            </li>
            {paymentMethods.map((img, i) => (
              <li
                key={i}
                className="flex-center w-11.25 h-8 bg-green-gray-900 border border-green-gray-800 rounded-b-md"
              >
                <img src={img} alt="payment method" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CopyrightBar;
