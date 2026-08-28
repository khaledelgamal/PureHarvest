import { useState } from 'react';
import { classNames } from '@/utils';
import { DescriptionTab } from './components/DescriptionTab/DescriptionTab';
import { AdditionalInfoTab } from './components/AdditionalInfoTab/AdditionalInfoTab';
import { CustomerFeedbackTab } from './components/CustomerFeedbackTab/CustomerFeedbackTab';
import type { Product } from '@/services/supabase/products/types';
import { useTranslation } from 'react-i18next';

type Tab = 'description' | 'additional' | 'feedback';

interface Props {
  product: Product;
}

export const ProductAdditionalInfoTabs = ({ product }: Props) => {
  const { t } = useTranslation('pages/ProductDetailsPage');
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'description', label: t('tabDescriptions', 'Descriptions') },
    { id: 'additional', label: t('tabAdditionalInfo', 'Additional Information') },
    { id: 'feedback', label: t('tabCustomerFeedback', 'Customer Feedback') },
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-col items-center justify-center border-b border-gray-100">
        <div className="flex gap-8 md:gap-16">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={classNames(
                'pb-4 font-medium transition-colors text-sm md:text-base border-b-2 cursor-pointer',
                activeTab === tab.id
                  ? 'text-gray-900 border-primary'
                  : 'text-gray-500 border-transparent hover:text-gray-900',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'description' && <DescriptionTab product={product} />}
        {activeTab === 'additional' && <AdditionalInfoTab product={product} />}
        {activeTab === 'feedback' && <CustomerFeedbackTab product={product} />}
      </div>
    </div>
  );
};
