import { useParams } from 'react-router-dom';
import { ProductImages } from './components/ProductImages/ProductImages';
import { ProductMainInfo } from './components/ProductMainInfo/ProductMainInfo';
import { ProductAdditionalInfoTabs } from './components/ProductAdditionalInfoTabs/ProductAdditionalInfoTabs';
import { classNames } from '@/utils';
import { sectionContainer, sectionPaddingY } from '@/constants/global.styles';
import { useProductDetails } from './hooks/useProductDetails';
import { ProductDetailsPageSkeleton } from './components/ProductDetailsPageSkeleton/ProductDetailsPageSkeleton';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, error } = useProductDetails(id || '');

  if (isLoading) {
    return <ProductDetailsPageSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className={classNames(sectionContainer, sectionPaddingY)}>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <ProductImages product={product} />
        <ProductMainInfo product={product} />
      </div>

      {/* Tabs Placeholder */}
      <div className="mt-16">
        <ProductAdditionalInfoTabs product={product} />
      </div>
    </div>
  );
};
export default ProductDetailsPage;
