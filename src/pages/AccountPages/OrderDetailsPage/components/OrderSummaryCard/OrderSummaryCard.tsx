import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import type { PaymentMethod } from '@/services/supabase/orders/types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('pages/AccountPages/OrderDetailsPage');

  const paymentMethodLabels: Record<PaymentMethod, string> = {
    cod: t('cashOnDelivery', 'Cash on Delivery'),
    paypal: t('paypal', 'Paypal'),
    amazon_pay: t('amazonPay', 'Amazon Pay'),
  };

  return (
    <div className="p-4 sm:p-5 border border-gray-100 rounded-md w-full xl:w-80 shrink-0">
      {/* ── Order ID + Payment Method ── */}
      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100 divide-x divide-gray-100">
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {t('orderId', 'Order ID')}
          </p>
          <p className=" text-gray-900 text-sm">#{orderNumber}</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-gray-400 uppercase">
            {t('paymentMethod', 'Payment Method')}
          </p>
          <p className="text-gray-900 text-sm">{paymentMethodLabels[paymentMethod]}</p>
        </div>
      </div>

      {/* ── Price Breakdown ── */}
      <div className="flex flex-col divide-y divide-gray-100">
        <div className="flex items-center justify-between text-sm py-3">
          <span className="text-gray-600">{t('subtotal', 'Subtotal:')}</span>
          <PriceDisplay price={subtotal} size="sm" />
        </div>

        <div className="flex items-center justify-between text-sm py-3">
          <span className="text-gray-600">{t('discount', 'Discount')}</span>
          <span className="text-gray-900 font-medium">
            {discountPercentage > 0 ? `${discountPercentage}%` : '—'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm py-3">
          <span className="text-gray-600">{t('shipping', 'Shipping')}</span>
          {shippingCost === 0 ? (
            <span className="text-gray-900 font-medium">{t('free', 'Free')}</span>
          ) : (
            <PriceDisplay price={shippingCost} size="sm" />
          )}
        </div>
      </div>

      {/* ── Total ── */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-gray-900">{t('total', 'Total')}</span>
        <PriceDisplay price={total} size="md" priceClassName="text-primary-hard" />
      </div>
    </div>
  );
};
