import WishlistFilledIcon from '@/icons/WishlistFilledIcon';
import WishlistIcon from '@/icons/WishlistIcon';
import type { AddToWishlistButtonVariant } from '../../components.type';
import { baseStyles, iconVariantStyles, variantStyles } from './styles';
import { classNames } from '@/utils';

type AddToWishlistButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: AddToWishlistButtonVariant;
};

export const AddToWishlistButton = ({
  variant = 'default',
  className,
  ...props
}: AddToWishlistButtonProps) => {
  const Icon = variant === 'active' ? WishlistFilledIcon : WishlistIcon;

  return (
    <button
      {...props}
      className={classNames(baseStyles, variantStyles[variant], className)}
      title="Add to wishlist"
    >
      <Icon className={classNames('w-5 h-5', iconVariantStyles[variant])} />
    </button>
  );
};
