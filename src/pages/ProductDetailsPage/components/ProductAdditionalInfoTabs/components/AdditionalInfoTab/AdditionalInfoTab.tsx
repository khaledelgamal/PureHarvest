import { ProductDetailsVideo } from '../ProductDetailsVideo/ProductDetailsVideo';
import type { Product } from '@/services/supabase/products/types';
import { useTranslation } from 'react-i18next';

interface Props {
  product: Product;
}

export const AdditionalInfoTab = ({ product }: Props) => {
  const { t } = useTranslation('pages/ProductDetailsPage');

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full pt-8">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">{t('weight', 'Weight:')}</span>
          <span className="text-gray-500">
            {product.weight ? `${product.weight} kg` : t('na', 'N/A')}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">{t('color', 'Color:')}</span>
          <span className="text-gray-500">{product.color || t('na', 'N/A')}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">{t('type', 'Type:')}</span>
          <span className="text-gray-500">{product.type || t('na', 'N/A')}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">{t('category', 'Category:')}</span>
          <span className="text-gray-500">{product.category?.name || t('na', 'N/A')}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-900 font-medium">{t('stockStatus', 'Stock Status:')}</span>
          <span className="text-gray-500">
            {product.stockStatus === 'in_stock'
              ? t('available', 'Available')
              : t('outOfStock', 'Out of Stock')}{' '}
            {product.stockQuantity !== null && (
              <span className="text-primary">({product.stockQuantity})</span>
            )}
          </span>
        </div>
        <div className="flex text-sm">
          <span className="w-32 text-gray-900 font-medium shrink-0">{t('tags', 'Tags:')}</span>
          <span className="text-gray-500 leading-relaxed">
            {product.tags && product.tags.length > 0
              ? product.tags.map(t => t.name).join(', ')
              : t('na', 'N/A')}
          </span>
        </div>
      </div>

      <ProductDetailsVideo />
    </div>
  );
};
