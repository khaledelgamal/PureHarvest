import { companyInfo } from '@/constants/companyInfo';
import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import PhoneCallIcon from '@/icons/PhoneCallIcon';
import { NavLink } from 'react-router-dom';

interface DesktopNavbarProps {
  tabs: { title: string; route: string }[];
}

const DesktopNavbar = ({ tabs }: DesktopNavbarProps) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-500'}`;

  return (
    <div
      className={`${sectionContainer} ${sectionPaddingX} hidden md:flex justify-between items-center`}
    >
      <ul className="flex items-center gap-8 py-6">
        {tabs.map(tab => (
          <li key={tab.route}>
            <NavLink to={tab.route} className={linkClass}>
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
  );
};

export default DesktopNavbar;
