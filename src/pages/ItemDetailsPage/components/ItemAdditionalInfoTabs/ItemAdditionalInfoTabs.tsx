import React, { useState } from 'react';
import { classNames } from '@/utils';
import { DescriptionTab } from './components/DescriptionTab';

type Tab = 'description' | 'additional' | 'feedback';

const TABS: { id: Tab; label: string }[] = [
  { id: 'description', label: 'Descriptions' },
  { id: 'additional', label: 'Additional Information' },
  { id: 'feedback', label: 'Customer Feedback' },
];

export const ItemAdditionalInfoTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-col items-center justify-center border-b border-gray-100">
        <div className="flex gap-8 md:gap-16">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={classNames(
                'pb-4 font-medium transition-colors text-sm md:text-base border-b-2',
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
        {activeTab === 'description' && <DescriptionTab />}
        {activeTab === 'additional' && (
          <div className="py-8 text-center text-gray-500">
            {/* TODO: Implement Additional Information Tab */}
            Additional Information Tab Content Placeholder
          </div>
        )}
        {activeTab === 'feedback' && (
          <div className="py-8 text-center text-gray-500">
            {/* TODO: Implement Customer Feedback Tab */}
            Customer Feedback Tab Content Placeholder
          </div>
        )}
      </div>
    </div>
  );
};
