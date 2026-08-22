import { ProductDetailsVideo } from '../ProductDetailsVideo/ProductDetailsVideo';
import type { Product } from '@/services/supabase/products/types';

interface Props {
  product: Product;
}

export const AdditionalInfoTab = ({ product }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full pt-8">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">Weight:</span>
          <span className="text-gray-500">{product.weight ? `${product.weight} kg` : 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">Color:</span>
          <span className="text-gray-500">{product.color || 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">Type:</span>
          <span className="text-gray-500">{product.type || 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">Category:</span>
          <span className="text-gray-500">{product.category?.name || 'N/A'}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">Stock Status:</span>
          <span className="text-gray-500">
            {product.stockStatus === 'in_stock' ? 'Available' : 'Out of Stock'}{' '}
            {product.stockQuantity !== null && (
              <span className="text-primary">({product.stockQuantity})</span>
            )}
          </span>
        </div>
        <div className="flex text-sm">
          <span className="w-32 text-gray-900 font-medium shrink-0">Tags:</span>
          <span className="text-gray-500 leading-relaxed">
            {product.tags && product.tags.length > 0
              ? product.tags.map(t => t.name).join(', ')
              : 'N/A'}
          </span>
        </div>
      </div>

      <ProductDetailsVideo />
    </div>
  );
};
