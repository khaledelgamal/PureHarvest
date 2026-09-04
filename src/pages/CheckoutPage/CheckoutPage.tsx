import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import { classNames } from '@/utils';
import BillingInformation from './components/BillingInformation';
import OrderSummaryCard from './components/OrderSummaryCard';
import { useCheckoutForm } from './hooks/useCheckoutForm';
import useCartStore from '@/store/useCartStore';
import { Link } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import { Button } from '@/components/Buttons/Button/Button';
import { useTranslation } from 'react-i18next';

const CheckoutPage = () => {
  const { t } = useTranslation('pages/CheckoutPage');
  const { register, watch, errors, onSubmit, isPending, error } = useCheckoutForm();
  const items = useCartStore(state => state.items);

  if (items.length === 0) {
    return (
      <div
        className={classNames(
          sectionContainer,
          'py-16 flex flex-col items-center justify-center min-h-[50vh]',
        )}
      >
        <h2 className="text-2xl font-medium text-gray-900 mb-6">
          {t('noAddedItems', 'No added items')}
        </h2>
        <Link to={routePaths.SHOP.ROOT}>
          <Button size="lg">{t('goToShop', 'Go To Shop')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={classNames(sectionContainer, 'py-8', sectionPaddingX)}>
      <form onSubmit={onSubmit} className="flex flex-col xl:flex-row gap-6">
        <BillingInformation register={register} watch={watch} errors={errors} />
        <OrderSummaryCard register={register} isPending={isPending} error={error} />
      </form>
    </div>
  );
};

export default CheckoutPage;
