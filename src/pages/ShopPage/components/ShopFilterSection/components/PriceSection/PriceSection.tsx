import { ChevronDown } from 'lucide-react';
import { classNames } from '@/utils';
import RangeInput from '@/components/Inputs/RangeInput/RangeInput';
import { usePriceSection } from './hooks/usePriceSection';

interface PriceSectionProps {
  initialMinPrice?: number;
  initialMaxPrice?: number;
  onPriceChange: (min: number | null, max: number | null) => void;
}

export const PriceSection = ({
  initialMinPrice = 0,
  initialMaxPrice = 50,
  onPriceChange,
}: PriceSectionProps) => {
  const { isVisible, toggleVisibility, localMinPrice, localMaxPrice, handlePriceChange } =
    usePriceSection(initialMinPrice, initialMaxPrice, onPriceChange);

  return (
    <div>
      <div
        className="w-full flex justify-between cursor-pointer border-t border-gray-100 py-5"
        onClick={toggleVisibility}
      >
        <h4 className="text-xl font-medium text-gray-900">Price</h4>
        <ChevronDown
          width={25}
          height={25}
          className={classNames('transition-transform duration-300', isVisible && 'rotate-180')}
        />
      </div>

      <div
        className={classNames(
          'overflow-hidden transition-all duration-300 ease-in-out py-2',
          isVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <RangeInput
          min={0}
          max={50}
          step={0.1}
          value={[localMinPrice, localMaxPrice]}
          onChange={handlePriceChange}
        />
        <p className="mt-4 text-sm text-gray-700">
          Price: <span className="font-medium">${localMinPrice.toFixed(2)}</span> -{' '}
          <span className="font-medium">${localMaxPrice.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};
