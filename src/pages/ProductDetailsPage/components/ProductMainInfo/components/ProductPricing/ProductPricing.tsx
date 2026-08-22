import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import type { Product } from '@/services/supabase/products/types';

interface ProductPricingProps {
  product: Product;
}

export const ProductPricing = ({ product }: ProductPricingProps) => {
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
          {discountPercent}% Off
        </span>
      )}
    </div>
  );
};

export default ProductPricing;
