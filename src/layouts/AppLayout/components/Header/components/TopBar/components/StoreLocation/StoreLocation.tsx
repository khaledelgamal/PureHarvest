import { companyInfo } from '@/constants/companyInfo';
import MapPinIcon from '@/icons/MapPinIcon';
import { useTranslation } from 'react-i18next';

const StoreLocation = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as keyof typeof companyInfo.location;
  return (
    <div className="flex items-center gap-1">
      <MapPinIcon className="text-gray-300 w-[15px] h-[18px]" />
      <p className="text-xs">
        {t('layouts.AppLayout.components.Header.components.TopBar.storeLocation')}:{' '}
        {companyInfo.location[lang]}
      </p>
    </div>
  );
};
export default StoreLocation;
