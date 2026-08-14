import { classNames } from '@/utils';
import type { PriceDisplaySize } from '../components.type';
import { baseStyles, oldPriceStyles, priceStyles, sizeStyles } from './styles';
import { useFormatPrice } from '@/hooks/useFormatPrice';

type PriceDisplayProps = {
  price: number;
  size?: PriceDisplaySize;
  oldPrice?: number;
  priceClassName?: string;
  oldPriceClassName?: string;
  containerClassName?: string;
};
const PriceDisplay = ({
  price,
  size = 'md',
  oldPrice,
  priceClassName,
  oldPriceClassName,
  containerClassName = '',
}: PriceDisplayProps) => {
  const formatPrice = useFormatPrice();
  return (
    <div className={classNames('flex gap-1', containerClassName)}>
      <span className={classNames(baseStyles, sizeStyles[size], priceStyles, priceClassName)}>
        {price === 0 ? 'Free' : formatPrice(price)}
      </span>
      {oldPrice && (
        <span
          className={classNames(baseStyles, sizeStyles[size], oldPriceStyles, oldPriceClassName)}
        >
          {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
