import type { Product } from '@/services/supabase/products/types';

interface ProductMetaProps {
  product: Product;
}

export const ProductMeta = ({ product }: ProductMetaProps) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <div>
        <span className="text-gray-900 font-medium mr-1">Category:</span>{' '}
        <span className="text-gray-500">{product.category?.name || 'Uncategorized'}</span>
      </div>
      <div>
        <span className="text-gray-900 font-medium mr-1">Tag:</span>{' '}
        <span className="text-gray-500">
          {product.tags && product.tags.length > 0
            ? product.tags.map(t => t.name).join(', ')
            : 'No tags'}
        </span>
      </div>
    </div>
  );
};

export default ProductMeta;
