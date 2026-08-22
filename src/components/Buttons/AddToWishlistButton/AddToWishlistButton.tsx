import WishlistFilledIcon from '@/icons/WishlistFilledIcon';
import WishlistIcon from '@/icons/WishlistIcon';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import type { AddToWishlistButtonVariant } from '../../components.type';
import { baseStyles, iconVariantStyles, variantStyles } from './styles';
import { classNames } from '@/utils';

type AddToWishlistButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: AddToWishlistButtonVariant;
  isLoading?: boolean;
};

export const AddToWishlistButton = ({
  variant = 'default',
  isLoading = false,
  className,
  disabled,
  ...props
}: AddToWishlistButtonProps) => {
  const Icon = variant === 'active' ? WishlistFilledIcon : WishlistIcon;

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={classNames(baseStyles, variantStyles[variant], className)}
      title={variant === 'active' ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {isLoading ? (
        <LoadingSpinner radiusInPx={18} borderWidth={2} loadingSpeed={0.8} color="#00b207" />
      ) : (
        <Icon className={classNames('w-5 h-5', iconVariantStyles[variant])} />
      )}
    </button>
  );
};
