import { ChevronDown } from 'lucide-react';
import { classNames } from '@/utils';
import { useTagsSection } from './hooks/useTagsSection';

interface TagsSectionProps {
  tags: { id: string; name: string; slug: string }[];
  currentTag: string;
  isLoading: boolean;
  onTagChange: (value: string | null) => void;
}

export const TagsSection = ({ tags, currentTag, isLoading, onTagChange }: TagsSectionProps) => {
  const { isVisible, toggleVisibility, handleTagChange } = useTagsSection(currentTag, onTagChange);

  return (
    <div>
      <div
        className="w-full flex justify-between cursor-pointer border-t border-gray-100 py-5"
        onClick={toggleVisibility}
      >
        <h4 className="text-xl font-medium text-gray-900">Popular Tag</h4>
        <ChevronDown
          width={25}
          height={25}
          className={classNames('transition-transform duration-300', isVisible && 'rotate-180')}
        />
      </div>

      <div
        className={classNames(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        {isLoading ? (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-8 w-16 bg-gray-100 animate-pulse rounded-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <button
                key={t.id}
                onClick={() => handleTagChange(t.slug)}
                className={classNames(
                  'px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200',
                  currentTag === t.slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100',
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
