import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import type { Product } from '@/services/supabase/products/types';
import { useTranslation } from 'react-i18next';

interface ProductPricingProps {
  product: Product;
}

export const ProductPricing = ({ product }: ProductPricingProps) => {
  const { t } = useTranslation('pages/ProductDetailsPage');
  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="flex items-center gap-2">
      <PriceDisplay
        price={product.salePrice || product.price}
        oldPrice={product.salePrice ? product.price : undefined}
        size="lg"
      />
      {discountPercent > 0 && (
        <span className="bg-danger/10 text-danger px-2 py-1 rounded-full text-xs font-semibold ml-2">
          {t('off', '{{percent}}% Off', { percent: discountPercent })}
        </span>
      )}
    </div>
  );
};

export default ProductPricing;
