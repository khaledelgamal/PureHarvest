import Star from '@/pages/ShopPage/components/Star/Star';
import type { Product } from '@/services/supabase/products/types';
import { classNames } from '@/utils';

interface ProductHeaderProps {
  product: Product;
}

export const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
        <span
          className={classNames(
            'px-2 py-1 rounded text-sm font-medium',
            product.stockStatus === 'in_stock'
              ? 'bg-primary-soft/30 text-primary-hard'
              : 'bg-danger/10 text-danger',
          )}
        >
          {product.stockStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <div className="flex text-warn">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                fillPercentage={Math.min(1, Math.max(0, (product.ratingAvg || 0) - i))}
              />
            ))}
          </div>
          <span className="text-gray-900 font-medium">
            {product.ratingCount || 0} Review{product.ratingCount !== 1 ? 's' : ''}
          </span>
        </div>
        <span>•</span>
        <span>
          SKU: <span className="text-gray-900 font-medium">{product.sku || 'N/A'}</span>
        </span>
      </div>
    </div>
  );
};

export default ProductHeader;
