import AddToCardIcon from '@/icons/AddToCardIcon';
import type { AddToCardButtonVariant } from '../../components.type';
import { baseStyles, iconVariantStyles, variantStyles } from './styles';
import { classNames } from '@/utils';

type AddToCardButtonProps = {
  onClick?: () => void;
  variant?: AddToCardButtonVariant;
};
export const AddToCardButton = ({ variant = 'default', onClick }: AddToCardButtonProps) => {
  return (
    <button
      className={classNames(baseStyles, variantStyles[variant])}
      onClick={onClick}
      title="Add to card"
    >
      <AddToCardIcon className={iconVariantStyles[variant]} />
    </button>
  );
};
