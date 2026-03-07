import { companyInfo } from '@/constants/companyInfo';
import { sectionContainer } from '@/constants/global.styles';
import PhoneCallIcon from '@/icons/PhoneCallIcon';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const tRoute = 'layouts.AppLayout.components.Header.components.Navbar.tabs.';

const Navbar = () => {
  const { t } = useTranslation();
  const tabs = [
    {
      title: t(`${tRoute}home`, 'Home'),
      route: routePaths.HOME,
    },
    {
      title: t(`${tRoute}shop`, 'Shop'),
      route: routePaths.SHOP.ROOT,
    },
    {
      title: t(`${tRoute}blog`, 'Blog'),
      route: routePaths.BLOGS.ROOT,
    },
    {
      title: t(`${tRoute}aboutUs`, 'About Us'),
      route: routePaths.ABOUT,
    },
    {
      title: t(`${tRoute}contactUs`, 'Contact Us'),
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
