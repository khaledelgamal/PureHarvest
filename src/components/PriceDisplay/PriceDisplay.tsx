import { classNames } from '@/utils';
import type { PriceDisplaySize } from '../components.type';
import { baseStyles, oldPriceStyles, priceStyles, sizeStyles } from './styles';

type PriceDisplay = {
  price: number | string;
  size: PriceDisplaySize;
  oldPrice?: number | string;
};
const PriceDisplay = ({ price, size = 'md', oldPrice }: PriceDisplay) => {
  return (
    <div className="flex-center gap-1">
      <span className={classNames(baseStyles, sizeStyles[size], priceStyles)}>${price}</span>
      {oldPrice && (
        <span className={classNames(baseStyles, sizeStyles[size], oldPriceStyles)}>
          ${oldPrice}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
