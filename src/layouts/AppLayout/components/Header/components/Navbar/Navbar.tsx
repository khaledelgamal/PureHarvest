import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';
import DesktopNavbar from './components/DesktopNavbar/DesktopNavbar';
import MobileNavbar from './components/MobileNavbar/MobileNavbar';

const Navbar = () => {
  const { t } = useTranslation('layouts/AppLayout');
  const tabs = [
    { title: t('home', 'Home'), route: routePaths.HOME },
    { title: t('shop', 'Shop'), route: routePaths.SHOP.ROOT },
    { title: t('blog', 'Blog'), route: routePaths.BLOGS.ROOT },
    { title: t('aboutUs', 'About Us'), route: routePaths.ABOUT },
    { title: t('contactUs', 'Contact Us'), route: routePaths.CONTACT_US },
  ];

  return (
    <nav className="bg-gray-50">
      <DesktopNavbar tabs={tabs} />
      <MobileNavbar tabs={tabs} />
    </nav>
  );
};
export default Navbar;
