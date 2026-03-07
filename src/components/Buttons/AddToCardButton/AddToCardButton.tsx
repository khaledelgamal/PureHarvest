import AddToCartIcon from '@/icons/AddToCartIcon';
import type { AddToCartButtonVariant } from '../../components.type';
import { baseStyles, iconVariantStyles, variantStyles } from './styles';
import { classNames } from '@/utils';

type AddToCartButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: AddToCartButtonVariant;
};
export const AddToCartButton = ({
  variant = 'default',
  className,
  ...props
}: AddToCartButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(baseStyles, variantStyles[variant], className)}
      title="Add to Cart"
    >
      <AddToCartIcon className={iconVariantStyles[variant]} />
    </button>
  );
};
