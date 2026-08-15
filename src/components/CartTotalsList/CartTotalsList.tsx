import React from 'react';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';

interface CartTotalsListProps {
  subtotal: number;
  shippingCost: number;
  total: number;
}

const spanClassname = 'text-gray-700 text-sm';
const priceClassname = 'font-bold text-gray-900 text-sm';
const liClassname = 'w-full flex justify-between py-3';

const CartTotalsList: React.FC<CartTotalsListProps> = ({ subtotal, shippingCost, total }) => {
  return (
    <ul className="list-none *:not-last:border-b *:not-last:border-gray-100">
      <li className={liClassname}>
        <span className={spanClassname}>Subtotal:</span>
        <PriceDisplay price={subtotal} priceClassName={priceClassname} />
      </li>
      <li className={liClassname}>
        <span className={spanClassname}>Shipping:</span>
        <div className={priceClassname}>
          {shippingCost === 0 ? (
            'Free'
          ) : (
            <PriceDisplay price={shippingCost} priceClassName={priceClassname} />
          )}
        </div>
      </li>
      <li className={liClassname}>
        <span className={spanClassname}>Total:</span>
        <PriceDisplay price={total} priceClassName={priceClassname} />
      </li>
    </ul>
  );
};

export default CartTotalsList;
