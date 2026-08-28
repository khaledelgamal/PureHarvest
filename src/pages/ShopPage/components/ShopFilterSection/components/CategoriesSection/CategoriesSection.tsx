import { ChevronDown } from 'lucide-react';
import { classNames } from '@/utils';
import RadioButtonInput from '@/components/Inputs/RadioButtonInput/RadioButtonInput';
import { useCategoriesSection } from './hooks/useCategoriesSection';
import { useTranslation } from 'react-i18next';

interface CategoriesSectionProps {
  categories: { id: string; name: string; slug: string; count: number }[];
  currentCategory: string;
  isLoading: boolean;
  onCategoryChange: (value: string | null) => void;
}

export const CategoriesSection = ({
  categories,
  currentCategory,
  isLoading,
  onCategoryChange,
}: CategoriesSectionProps) => {
  const { t } = useTranslation('pages/ShopPage');
  const { isVisible, toggleVisibility, handleCategoryChange, handleClearCategory } =
    useCategoriesSection(currentCategory, onCategoryChange);

  const totalCount = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between cursor-pointer" onClick={toggleVisibility}>
        <h4 className="text-xl font-medium text-gray-900">{t('allCategories', 'All Categories')}</h4>
        <ChevronDown
          width={25}
          height={25}
          className={classNames('transition-transform duration-300', isVisible && 'rotate-180')}
        />
      </div>

      <div
        className={classNames(
          'transition-all duration-300 ease-in-out overflow-y-auto',
          isVisible ? 'h-[200px] opacity-100' : 'h-0 opacity-0',
        )}
      >
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-5 w-full bg-gray-100 animate-pulse rounded-md" />
            ))}
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            <li>
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <RadioButtonInput onChange={handleClearCategory} checked={currentCategory === ''} />
                <p>
                  <span className="text-gray-900">{t('all', 'All')} </span>({totalCount})
                </p>
              </label>
            </li>
            {categories.map(cat => (
              <label className="flex items-center gap-2 text-sm text-gray-500" key={cat.id}>
                <RadioButtonInput
                  onChange={() => handleCategoryChange(cat.slug)}
                  checked={currentCategory === cat.slug}
                />
                <p>
                  <span className="text-gray-900">{cat.name} </span>({cat.count})
                </p>
              </label>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
