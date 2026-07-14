import { ChevronDown } from 'lucide-react';
import { classNames } from '@/utils';
import RadioButtonInput from '@/components/Inputs/RadioButtonInput/RadioButtonInput';
import { useRatingSection } from './hooks/useRatingSection';
import Star from '../../../Star/Star';

interface RatingSectionProps {
  currentRating?: number;
  onRatingChange: (value: number | undefined) => void;
}

export const RatingSection = ({ currentRating, onRatingChange }: RatingSectionProps) => {
  const { isVisible, toggleVisibility, handleRatingChange } = useRatingSection(
    currentRating,
    onRatingChange,
  );

  return (
    <div>
      <div
        className="w-full flex justify-between cursor-pointer border-t border-gray-100 py-5"
        onClick={toggleVisibility}
      >
        <h4 className="text-xl font-medium text-gray-900">Rating</h4>
        <ChevronDown
          width={25}
          height={25}
          className={classNames('transition-transform duration-300', isVisible && 'rotate-180')}
        />
      </div>

      <ul
        className={classNames(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        {[4, 3, 2, 1].map(number => (
          <li key={number} className="flex items-center gap-2 pl-1 py-[10px]">
            <RadioButtonInput
              className="w-4.5 h-4.5"
              id={`rating-${number}`}
              checked={number === currentRating}
              onChange={() => handleRatingChange(number)}
            />
            <label
              htmlFor={`rating-${number}`}
              className="flex items-center cursor-pointer select-none gap-1"
            >
              {Array.from({ length: number }).map((_, i) => (
                <Star key={i} fillPercentage={1} />
              ))}
              {Array.from({ length: 5 - number }).map((_, i) => (
                <Star key={i} fillPercentage={0} />
              ))}
              <p className="text-gray-900 pl-1 text-[14px]">
                {number.toFixed(1)} {number !== 5 && '& up'}
              </p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
