import React from 'react';
import useCartStore from '@/store/useCartStore';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import { Button } from '@/components/Buttons/Button/Button';
import RadioButtonInput from '@/components/Inputs/RadioButtonInput/RadioButtonInput';
import CartTotalsList from '@/components/CartTotalsList/CartTotalsList';
import type { UseFormRegister } from 'react-hook-form';
import type { CheckoutFormValues } from '../hooks/useCheckoutForm';

interface OrderSummaryCardProps {
  register: UseFormRegister<CheckoutFormValues>;
  isPending?: boolean;
  error?: Error | null;
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ register, isPending, error }) => {
  const items = useCartStore(state => state.items);

  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost = 0; // Free
  const total = subtotal + shippingCost;

  return (
    <div className="w-full xl:max-w-[424px] border border-gray-100 rounded-lg p-6 flex flex-col gap-6">
      <h3 className="text-xl font-medium text-gray-900">Order Summary</h3>

      <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2">
        {items.map(item => (
          <div key={item.product.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {item.product.imageUrl && (
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-[60px] h-[60px] object-cover rounded"
                />
              )}
              <span className="text-gray-900 text-sm">
                {item.product.name} <span className="text-gray-500">x{item.quantity}</span>
              </span>
            </div>
            <PriceDisplay
              price={(item.product.salePrice || item.product.price) * item.quantity}
              priceClassName="font-medium text-gray-900 text-sm"
            />
          </div>
        ))}
      </div>

      <CartTotalsList subtotal={subtotal} shippingCost={shippingCost} total={total} />

      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-xl font-medium text-gray-900">Payment Method</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <RadioButtonInput id="cashOnDelivery" value="cod" {...register('paymentMethod')} />
            <label htmlFor="cashOnDelivery" className="text-sm text-gray-700 cursor-pointer">
              Cash on Delivery
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioButtonInput id="paypal" value="paypal" {...register('paymentMethod')} />
            <label htmlFor="paypal" className="text-sm text-gray-700 cursor-pointer">
              Paypal
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioButtonInput id="amazonPay" value="amazon" {...register('paymentMethod')} />
            <label htmlFor="amazonPay" className="text-sm text-gray-700 cursor-pointer">
              Amazon Pay
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-md">
          <p className="text-sm text-red-600">{error.message}</p>
        </div>
      )}

      <Button type="submit" className="w-full mt-4 py-3" size="lg" disabled={isPending}>
        {isPending ? 'Placing Order...' : 'Place Order'}
      </Button>
    </div>
  );
};

export default OrderSummaryCard;
