import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { routePaths } from '@/router/routePaths';
import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import AppLogo from '@/components/AppLogo/AppLogo';
import ShoppingCart from '../MainHeader/components/ShoppingCart/ShoppingCart';
import GlobalSearch from '../MainHeader/components/GlobalSearch/GlobalSearch';
import MobileMenuModal from './components/MobileMenuModal/MobileMenuModal';
import { Link } from 'react-router-dom';
import { DropDown } from '@/components/DropDown/DropDown';
import { languages } from '@/i18n/languages';
import { localStorageKeys } from '@/constants/localStorageKeys';
import { Menu } from 'lucide-react';
import useNavTabs from '../../hooks/useNavTabs';

const MobileHeader = () => {
  const { t, i18n } = useTranslation('layouts/AppLayout');
  const tabs = useNavTabs();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLangChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem(localStorageKeys.language, value);
  };

  return (
    <>
      <div className="lg:hidden bg-white pb-3">
        {/* Row 1: Hamburger | Logo | (Lang Dropdown + Cart) */}
        <div
          className={`${sectionContainer} ${sectionPaddingX} flex items-center justify-between gap-2 py-3`}
        >
          {/* Left: Hamburger button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label={t('openMenu', 'Open menu')}
            aria-expanded={isMenuOpen}
            className="p-1 -ml-1 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: Logo in normal flex flow */}
          <Link to={routePaths.HOME} className="flex-1 flex justify-start shrink min-w-0">
            <AppLogo size="sm" className="sm:hidden" />
            <AppLogo size="md" className="hidden sm:flex" />
          </Link>

          {/* Right actions: Language dropdown beside ShoppingCart */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <DropDown
              options={languages}
              value={i18n.language}
              onChange={handleLangChange}
              gap="0.25rem"
              className="text-xs font-medium text-gray-700"
            />
            <span className="w-px h-5 bg-gray-200" />
            <ShoppingCart />
          </div>
        </div>

        {/* Row 2: Search */}
        <div className={`${sectionContainer} ${sectionPaddingX} flex-center mt-4 w-full`}>
          <GlobalSearch />
        </div>
      </div>

      <MobileMenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} tabs={tabs} />
    </>
  );
};

export default MobileHeader;
