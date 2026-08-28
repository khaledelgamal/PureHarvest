import { routePaths } from '@/router/routePaths';
import { sectionContainer } from '@/constants/global.styles';
import { useTranslation } from 'react-i18next';
import type { FooterLink } from './types';
import FooterAbout from './components/FooterAbout/FooterAbout';
import FooterLinkColumn from './components/FooterLinkColumn/FooterLinkColumn';
import FooterInstagram from './components/FooterInstagram/FooterInstagram';
import CopyrightBar from './components/CopyrightBar/CopyrightBar';

const MainFooter = () => {
  const { t } = useTranslation('layouts/AppLayout');

  const myAccountLinks: FooterLink[] = [
    { label: t('myAccount', 'My Account'), to: routePaths.ACCOUNT.ROOT },
    {
      label: t('orderHistory', 'Order History'),
      to: routePaths.ACCOUNT.ORDER_HISTORY.path,
    },
    {
      label: t('shoppingCart', 'Shopping Cart'),
      to: routePaths.SHOPPING_CART.ROOT,
    },
    { label: t('wishlist', 'Wishlist'), to: routePaths.WISHLIST },
    {
      label: t('settings', 'Settings'),
      to: routePaths.ACCOUNT.SETTINGS.path,
    },
  ];

  const helpsLinks: FooterLink[] = [
    { label: t('contact', 'Contact'), to: routePaths.CONTACT_US },
    { label: t('faqs', 'Faqs'), to: routePaths.FAQS },
  ];

  const proxyLinks: FooterLink[] = [
    { label: t('about', 'About'), to: routePaths.ABOUT },
    { label: t('shop', 'Shop'), to: routePaths.SHOP.ROOT },
  ];

  return (
    <div className="relative bg-[#0a2e1c] overflow-hidden">
      <img
        src="/images/footer_bg_left.png"
        alt=""
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-full object-contain opacity-40"
      />
      <img
        src="/images/footer_bg_right.png"
        alt=""
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-full object-contain opacity-40"
      />

      <div className={`${sectionContainer} relative z-10 py-16 px-4`}>
        <div className="flex flex-wrap justify-between gap-8">
          <FooterAbout />
          <FooterLinkColumn
            title={t('myAccount', 'My Account')}
            links={myAccountLinks}
          />
          <FooterLinkColumn title={t('helps', 'Helps')} links={helpsLinks} />
          <FooterLinkColumn title={t('proxy', 'Proxy')} links={proxyLinks} />
          <FooterInstagram />
        </div>
      </div>

      <CopyrightBar />
    </div>
  );
};

export default MainFooter;
