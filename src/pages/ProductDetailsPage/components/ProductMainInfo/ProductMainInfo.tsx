import type { Product } from '@/services/supabase/products/types';
import { ProductHeader } from './components/ProductHeader/ProductHeader';
import { ProductPricing } from './components/ProductPricing/ProductPricing';
import { ProductBrandAndShare } from './components/ProductBrandAndShare/ProductBrandAndShare';
import { ProductActions } from './components/ProductActions/ProductActions';
import { ProductMeta } from './components/ProductMeta/ProductMeta';

interface ProductMainInfoProps {
  product: Product;
}

export const ProductMainInfo = ({ product }: ProductMainInfoProps) => {
  return (
    <div className="flex flex-col flex-1 gap-6">
      <ProductHeader product={product} />

      <ProductPricing product={product} />

      <hr className="border-gray-200" />

      <ProductBrandAndShare product={product} />

      <p className="text-gray-500 text-sm leading-relaxed">
        {product.shortDescription || 'No description available.'}
      </p>

      <ProductActions product={product} />

      <ProductMeta product={product} />
    </div>
  );
};

export default ProductMainInfo;
