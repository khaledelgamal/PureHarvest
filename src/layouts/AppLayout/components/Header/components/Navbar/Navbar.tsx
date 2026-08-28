import { companyInfo } from '@/constants/companyInfo';
import { sectionContainer } from '@/constants/global.styles';
import PhoneCallIcon from '@/icons/PhoneCallIcon';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { t } = useTranslation('layouts/AppLayout');
  const tabs = [
    {
      title: t('home', 'Home'),
      route: routePaths.HOME,
    },
    {
      title: t('shop', 'Shop'),
      route: routePaths.SHOP.ROOT,
    },
    {
      title: t('blog', 'Blog'),
      route: routePaths.BLOGS.ROOT,
    },
    {
      title: t('aboutUs', 'About Us'),
      route: routePaths.ABOUT,
    },
    {
      title: t('contactUs', 'Contact Us'),
      route: routePaths.CONTACT_US,
    },
  ];
  return (
    <nav className="bg-gray-50">
      <div className={`${sectionContainer} flex justify-between `}>
        <ul className="flex items-center py-6 gap-8">
          {tabs.map(tab => (
            <li key={tab.route}>
              <NavLink
                to={tab.route}
                className={({ isActive }) =>
                  `py-6 text-sm font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-500'}`
                }
              >
                {tab.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <a
          href={`tel:${companyInfo.phone}`}
          className="flex gap-2 items-center transition-colors hover:text-primary"
        >
          <PhoneCallIcon className="w-7 h-7" />
          <span className="text-sm">{companyInfo.phone}</span>
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
