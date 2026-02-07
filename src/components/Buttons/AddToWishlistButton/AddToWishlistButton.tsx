import WishlistFilledIcon from '@/icons/WishlistFilledIcon';
import WishlistIcon from '@/icons/WishlistIcon';
import type { AddToWishlistButtonVariant } from '../../components.type';
import { baseStyles, iconVariantStyles, variantStyles } from './styles';
import { classNames } from '@/utils';

type AddToWishlistButtonProps = {
  onClick?: () => void;
  variant?: AddToWishlistButtonVariant;
};

export const AddToWishlistButton = ({ variant = 'default', onClick }: AddToWishlistButtonProps) => {
  const Icon = variant === 'active' ? WishlistFilledIcon : WishlistIcon;

  return (
    <button
      className={classNames(baseStyles, variantStyles[variant])}
      onClick={onClick}
      title="Add to wishlist"
    >
      <Icon className={classNames('w-5 h-5', iconVariantStyles[variant])} />
    </button>
  );
};
