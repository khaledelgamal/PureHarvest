import { companyInfo } from '@/constants/companyInfo';
import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import CloseIcon from '@/icons/CloseIcon';
import PhoneCallIcon from '@/icons/PhoneCallIcon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

/** Three-line hamburger SVG (inline to avoid creating a new icon file) */
const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

interface MobileNavbarProps {
  tabs: { title: string; route: string }[];
}

const MobileNavbar = ({ tabs }: MobileNavbarProps) => {
  const { t } = useTranslation('layouts/AppLayout');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Mobile bar ──────────────────────────────────────────────── */}
      <div
        className={`${sectionContainer} ${sectionPaddingX} flex md:hidden justify-between items-center py-3`}
      >
        {/* Phone link on the left */}
        <a
          href={`tel:${companyInfo.phone}`}
          className="flex gap-2 items-center transition-colors hover:text-primary"
        >
          <PhoneCallIcon className="w-5 h-5" />
          <span className="text-sm">{companyInfo.phone}</span>
        </a>

        {/* Hamburger / Close toggle */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          aria-label={isOpen ? t('closeMenu', 'Close menu') : t('openMenu', 'Open menu')}
          aria-expanded={isOpen}
          className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <CloseIcon className="w-5 h-5" /> : <HamburgerIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className={`${sectionPaddingX} flex flex-col border-t border-gray-200`}>
          {tabs.map(tab => (
            <li key={tab.route}>
              <NavLink
                to={tab.route}
                className={({ isActive }) =>
                  `block py-3 text-sm font-medium border-b border-gray-100 last:border-0 hover:text-primary transition-colors ${
                    isActive ? 'text-primary' : 'text-gray-600'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {tab.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileNavbar;
