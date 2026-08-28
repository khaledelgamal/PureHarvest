import React from 'react';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import { useTranslation } from 'react-i18next';

interface CartTotalsListProps {
  subtotal: number;
  shippingCost: number;
  total: number;
  namespace?: string;
}

const spanClassname = 'text-gray-700 text-sm';
const priceClassname = 'font-bold text-gray-900 text-sm';
const liClassname = 'w-full flex justify-between py-3';

const CartTotalsList: React.FC<CartTotalsListProps> = ({
  subtotal,
  shippingCost,
  total,
  namespace = 'layouts/AppLayout',
}) => {
  const { t } = useTranslation(namespace);

  return (
    <ul className="list-none *:not-last:border-b *:not-last:border-gray-100">
      <li className={liClassname}>
        <span className={spanClassname}>{t('subtotal', 'Subtotal:')}</span>
        <PriceDisplay price={subtotal} priceClassName={priceClassname} />
      </li>
      <li className={liClassname}>
        <span className={spanClassname}>{t('shipping', 'Shipping:')}</span>
        <div className={priceClassname}>
          {shippingCost === 0 ? (
            t('free', 'Free')
          ) : (
            <PriceDisplay price={shippingCost} priceClassName={priceClassname} />
          )}
        </div>
      </li>
      <li className={liClassname}>
        <span className={spanClassname}>{t('total', 'Total:')}</span>
        <PriceDisplay price={total} priceClassName={priceClassname} />
      </li>
    </ul>
  );
};

export default CartTotalsList;
