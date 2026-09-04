import { classNames } from '@/utils';

const buttonClassname =
  'w-8! h-8! flex-center rounded-full bg-gray-50 hover:bg-gray-100 cursor-pointer';

type QuantityInputProps = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
};

const QuantityInput = ({ value, onIncrease, onDecrease, className }: QuantityInputProps) => {
  return (
    <div
      className={classNames(
        'flex items-center rounded-full justify-center gap-2 border border-gray-100',
        className,
      )}
    >
      <button className={buttonClassname} onClick={onDecrease} aria-label="Decrease quantity">
        -
      </button>
      <span className="w-10 text-center">{value}</span>
      <button className={buttonClassname} onClick={onIncrease} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
};

export default QuantityInput;
