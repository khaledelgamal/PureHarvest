import React from 'react';
import { sectionContainer } from '@/constants/global.styles';
import { classNames } from '@/utils';
import BillingInformation from './components/BillingInformation';
import OrderSummaryCard from './components/OrderSummaryCard';
import { useCheckoutForm } from './hooks/useCheckoutForm';
import useCartStore from '@/store/useCartStore';
import { Link } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import { Button } from '@/components/Buttons/Button/Button';

const CheckoutPage = () => {
  const { register, errors, onSubmit, isPending, error } = useCheckoutForm();
  const items = useCartStore(state => state.items);

  if (items.length === 0) {
    return (
      <div
        className={classNames(
          sectionContainer,
          'py-16 flex flex-col items-center justify-center min-h-[50vh]',
        )}
      >
        <h2 className="text-2xl font-medium text-gray-900 mb-6">No added items</h2>
        <Link to={routePaths.SHOP.ROOT}>
          <Button size="lg">Go To Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={classNames(sectionContainer, 'py-8')}>
      <form onSubmit={onSubmit} className="flex flex-col xl:flex-row gap-6">
        <BillingInformation register={register} errors={errors} />
        <OrderSummaryCard register={register} isPending={isPending} error={error} />
      </form>
    </div>
  );
};

export default CheckoutPage;
