import { routePaths } from '@/router/routePaths';
import { sectionContainer } from '@/constants/global.styles';
import { useTranslation } from 'react-i18next';
import type { FooterLink } from './types';
import FooterAbout from './components/FooterAbout/FooterAbout';
import FooterLinkColumn from './components/FooterLinkColumn/FooterLinkColumn';
import FooterInstagram from './components/FooterInstagram/FooterInstagram';
import CopyrightBar from './components/CopyrightBar/CopyrightBar';

const tRoute = 'layouts.AppLayout.components.Footer.components.MainFooter';

const MainFooter = () => {
  const { t } = useTranslation();

  const myAccountLinks: FooterLink[] = [
    { label: t(`${tRoute}.myAccount.links.myAccount`, 'My Account'), to: routePaths.ACCOUNT.ROOT },
    {
      label: t(`${tRoute}.myAccount.links.orderHistory`, 'Order History'),
      to: routePaths.ACCOUNT.ORDER_HISTORY.path,
    },
    {
      label: t(`${tRoute}.myAccount.links.shoppingCart`, 'Shopping Cart'),
      to: routePaths.SHOPPING_CART.ROOT,
    },
    { label: t(`${tRoute}.myAccount.links.wishlist`, 'Wishlist'), to: routePaths.WISHLIST },
    {
      label: t(`${tRoute}.myAccount.links.settings`, 'Settings'),
      to: routePaths.ACCOUNT.SETTINGS.path,
    },
  ];

  const helpsLinks: FooterLink[] = [
    { label: t(`${tRoute}.helps.links.contact`, 'Contact'), to: routePaths.CONTACT_US },
    { label: t(`${tRoute}.helps.links.faqs`, 'Faqs'), to: routePaths.FAQS },
  ];

  const proxyLinks: FooterLink[] = [
    { label: t(`${tRoute}.proxy.links.about`, 'About'), to: routePaths.ABOUT },
    { label: t(`${tRoute}.proxy.links.shop`, 'Shop'), to: routePaths.SHOP.ROOT },
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
            title={t(`${tRoute}.myAccount.title`, 'My Account')}
            links={myAccountLinks}
          />
          <FooterLinkColumn title={t(`${tRoute}.helps.title`, 'Helps')} links={helpsLinks} />
          <FooterLinkColumn title={t(`${tRoute}.proxy.title`, 'Proxy')} links={proxyLinks} />
          <FooterInstagram />
        </div>
      </div>

      <CopyrightBar />
    </div>
  );
};

export default MainFooter;
