// import { useParams } from 'react-router-dom';
import ProductImages from './components/ProductImages';
import ProductMainInfo from './components/ProductMainInfo';
import { ItemAdditionalInfoTabs } from './components/ItemAdditionalInfoTabs/ItemAdditionalInfoTabs';
import { classNames } from '@/utils';
import { sectionContainer, sectionPaddingY } from '@/constants/global.styles';

const ItemDetailsPage = () => {
  // const id = useParams().id!;
  return (
    <div className={classNames(sectionContainer, sectionPaddingY)}>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <ProductImages />
        <ProductMainInfo />
      </div>

      {/* Tabs Placeholder */}
      <div className="mt-16">
        <ItemAdditionalInfoTabs />
      </div>
    </div>
  );
};
export default ItemDetailsPage;
