import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import ShoppingCartTable from './components/ShoppingCartTable/ShoppingCartTable';
import { classNames } from '@/utils';
import CartTotals from './components/CartTotals/CartTotals';
import { useTranslation } from 'react-i18next';

const ShoppingCartPage = () => {
  const { t } = useTranslation('pages/ShoppingCartPage');

  return (
    <div className={classNames(sectionContainer, sectionPaddingX)}>
      <h3 className="font-semibold text-3xl text-center my-8">{t('title', 'My Shopping Cart')}</h3>
      <div className="flex gap-6 flex-col xl:flex-row mb-4">
        <ShoppingCartTable />
        <CartTotals />
      </div>
    </div>
  );
};
export default ShoppingCartPage;
