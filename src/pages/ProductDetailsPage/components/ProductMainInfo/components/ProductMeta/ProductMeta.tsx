import type { Product } from '@/services/supabase/products/types';
import { useTranslation } from 'react-i18next';

interface ProductMetaProps {
  product: Product;
}

export const ProductMeta = ({ product }: ProductMetaProps) => {
  const { t } = useTranslation('pages/ProductDetailsPage');

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div>
        <span className="text-gray-900 font-medium mr-1">{t('category', 'Category:')}</span>{' '}
        <span className="text-gray-500">
          {product.category?.name || t('uncategorized', 'Uncategorized')}
        </span>
      </div>
      <div>
        <span className="text-gray-900 font-medium mr-1">{t('tag', 'Tag:')}</span>{' '}
        <span className="text-gray-500">
          {product.tags && product.tags.length > 0
            ? product.tags.map(t => t.name).join(', ')
            : t('noTags', 'No tags')}
        </span>
      </div>
    </div>
  );
};

export default ProductMeta;
