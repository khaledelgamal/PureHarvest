import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import type { PaymentMethod } from '@/services/supabase/orders/types';

const paymentMethodLabels: Record<PaymentMethod, string> = {
  cod: 'Cash on Delivery',
  paypal: 'Paypal',
  amazon_pay: 'Amazon Pay',
};

type OrderSummaryCardProps = {
  orderNumber: number;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discountPercentage: number;
  shippingCost: number;
  total: number;
};

export const OrderSummaryCard = ({
  orderNumber,
  paymentMethod,
  subtotal,
  discountPercentage,
  shippingCost,
  total,
}: OrderSummaryCardProps) => {
  return (
    <div className="p-5 border border-gray-100 rounded-md min-w-72">
      {/* ── Order ID + Payment Method ── */}
      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100 divide-x divide-gray-100">
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</p>
          <p className=" text-gray-900 text-sm">#{orderNumber}</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-gray-400 uppercase">Payment Method</p>
          <p className="text-gray-900 text-sm">{paymentMethodLabels[paymentMethod]}</p>
        </div>
      </div>

      {/* ── Price Breakdown ── */}
      <div className="flex flex-col divide-y divide-gray-100">
        <div className="flex items-center justify-between text-sm py-3">
          <span className="text-gray-600">Subtotal:</span>
          <PriceDisplay price={subtotal} size="sm" />
        </div>

        <div className="flex items-center justify-between text-sm py-3">
          <span className="text-gray-600">Discount</span>
          <span className="text-gray-900 font-medium">
            {discountPercentage > 0 ? `${discountPercentage}%` : '—'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm py-3">
          <span className="text-gray-600">Shipping</span>
          {shippingCost === 0 ? (
            <span className="text-gray-900 font-medium">Free</span>
          ) : (
            <PriceDisplay price={shippingCost} size="sm" />
          )}
        </div>
      </div>

      {/* ── Total ── */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-gray-900">Total</span>
        <PriceDisplay price={total} size="md" priceClassName="text-primary-hard" />
      </div>
    </div>
  );
};
