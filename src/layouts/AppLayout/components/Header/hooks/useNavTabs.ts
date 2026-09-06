import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';

const useNavTabs = () => {
  const { t } = useTranslation('layouts/AppLayout');
  return [
    { title: t('home', 'Home'), route: routePaths.HOME },
    { title: t('shop', 'Shop'), route: routePaths.SHOP.ROOT },
    { title: t('blog', 'Blog'), route: routePaths.BLOGS.ROOT },
    { title: t('aboutUs', 'About Us'), route: routePaths.ABOUT },
    { title: t('contactUs', 'Contact Us'), route: routePaths.CONTACT_US },
  ];
};
export default useNavTabs;
