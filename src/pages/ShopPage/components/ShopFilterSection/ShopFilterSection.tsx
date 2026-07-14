import { SearchInput } from './components/SearchInput/SearchInput';
import { CategoriesSection } from './components/CategoriesSection/CategoriesSection';
import { PriceSection } from './components/PriceSection/PriceSection';
import { RatingSection } from './components/RatingSection/RatingSection';
import { TagsSection } from './components/TagsSection/TagsSection';

interface FilterState {
  search: string;
  category: string;
  tag: string;
  minPrice?: number;
  maxPrice?: number;
  ratingAvg?: number;
}
interface ShopFilterSectionProps {
  search: string;
  category: string;
  tag: string;
  minPrice?: number;
  maxPrice?: number;
  ratingAvg?: number;
  categories: { id: string; name: string; slug: string; count: number }[];
  tags: { id: string; name: string; slug: string }[];
  isLoadingCategories: boolean;
  isLoadingTags: boolean;
  onFilterChange: (key: keyof FilterState, value: string | null) => void;
}

export const ShopFilterSection = ({
  search,
  category,
  tag,
  minPrice,
  maxPrice,
  ratingAvg,
  categories,
  tags,
  isLoadingCategories,
  isLoadingTags,
  onFilterChange,
}: ShopFilterSectionProps) => {
  return (
    <div className="w-[280px] shrink-0 flex flex-col gap-4">
      <SearchInput
        initialSearch={search}
        onSearchChange={value => onFilterChange('search', value)}
      />
      <CategoriesSection
        categories={categories}
        currentCategory={category}
        isLoading={isLoadingCategories}
        onCategoryChange={value => onFilterChange('category', value)}
      />
      <PriceSection
        initialMinPrice={minPrice ?? 0}
        initialMaxPrice={maxPrice ?? 50}
        onPriceChange={(min, max) => {
          if (min !== null) onFilterChange('minPrice', min.toString());
          if (max !== null) onFilterChange('maxPrice', max.toString());
        }}
      />
      <RatingSection
        currentRating={ratingAvg}
        onRatingChange={value => onFilterChange('ratingAvg', value?.toString() ?? null)}
      />
      <TagsSection
        tags={tags}
        currentTag={tag}
        isLoading={isLoadingTags}
        onTagChange={value => onFilterChange('tag', value)}
      />
    </div>
  );
};
