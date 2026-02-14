import AddToCardIcon from '@/icons/AddToCardIcon';
import type { AddToCardButtonVariant } from '../../components.type';
import { baseStyles, iconVariantStyles, variantStyles } from './styles';
import { classNames } from '@/utils';

type AddToCardButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: AddToCardButtonVariant;
};
export const AddToCardButton = ({
  variant = 'default',
  className,
  ...props
}: AddToCardButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(baseStyles, variantStyles[variant], className)}
      title="Add to card"
    >
      <AddToCardIcon className={iconVariantStyles[variant]} />
    </button>
  );
};
