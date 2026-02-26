import CurrencyDropdown from './components/CurrencyDropdown/CurrencyDropdown';
import LangDropdown from './components/LangDropdown/LangDropdown';
import StoreLocation from './components/StoreLocation/StoreLocation';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';

const TobBar = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-between items-center">
      <StoreLocation />
      <div className="flex gap-5 items-center">
        <LangDropdown />
        <CurrencyDropdown />
        <span className="text-gray-300 opacity-70">|</span>
        <div className="flex gap-1 text-xs">
          <Link
            to={routePaths.ACCOUNT.SIGNIN}
            className="text-gray-300 hover:border-gray-300 px-0 py-0 hover:underline"
          >
            {t('layouts.AppLayout.components.Header.components.TopBar.signin')}
          </Link>
          /
          <Link
            to={routePaths.ACCOUNT.SIGNUP}
            className="text-gray-300 hover:border-gray-300 px-0 py-0 hover:underline"
          >
            {t('layouts.AppLayout.components.Header.components.TopBar.signup')}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TobBar;
