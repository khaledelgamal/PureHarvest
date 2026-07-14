import { Button } from '@/components/Buttons/Button/Button';
import styles from '../../WishlistTable.module.css';
import DeleteIcon from '@/icons/DeleteIcon';
import type { WishlistItem, Wishlists } from '@/services/supabase/wishlists/types';
import { wishlistKeys, wishlistsAPI } from '@/services/supabase/wishlists';
import { useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productKeys } from '@/services/supabase/products';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import { contactSupport } from '@/constants/companyInfo';
type ItemAdditionState = 'in-cart' | 'not-in-cart' | 'added-to-cart';
const WishlistTableActions = ({ item }: { item: WishlistItem }) => {
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const userId = useAuthStore(state => state.user?.id);
  const addToCart = useCartStore(state => state.addItem);
  const cartItems = useCartStore(state => state.items);

  const mutation = useMutation({
    mutationFn: async () => {
      await wishlistsAPI.removeFromWishlist(item.userId, item.productId);
    },

    onMutate: () => {
      setIsUpdatingWishlist(true);
    },

    onSuccess: () => {
      toast.message(`${item.product?.name} removed from wishlist.`);
      queryClient.setQueryData(wishlistKeys.list(userId || ''), (oldData: Wishlists) => {
        if (!oldData || (oldData && oldData.total <= 1)) return { items: [], total: 0 };
        return {
          items: oldData.items.filter(i => i.productId !== item.productId),
          total: oldData.total - 1,
        };
      });
      queryClient.invalidateQueries({ queryKey: productKeys.list() });
    },

    onError: error => {
      console.log(error);
      toast.error(`Failed to remove ${item.product?.name} from wishlist. Please try again.`);
    },

    onSettled: () => {
      setIsUpdatingWishlist(false);
    },
  });

  const handleAddToCart = () => {
    if (item.product) {
      addToCart(item.product);
    } else {
      toast.error(
        'error requesting this product. Please contact support at (' + contactSupport.email + ').',
      );
    }
  };
  const itemAdditionState = cartItems.some(cartItem => cartItem.product.id === item.productId)
    ? 'in-cart'
    : 'not-in-cart';
  console.log(itemAdditionState);

  return (
    <div className={styles.actionButtons}>
      <Button
        size="md"
        onClick={handleAddToCart}
        disabled={(['in-cart', 'added-to-cart'] as ItemAdditionState[]).includes(itemAdditionState)}
      >
        {itemAdditionState === 'in-cart'
          ? 'Already In Cart'
          : itemAdditionState === 'not-in-cart'
            ? 'Add to Cart'
            : 'Added to Cart'}
      </Button>
      <Button
        variant="rounded"
        className={styles.deleteButton}
        size="sm"
        title="Remove from wishlist"
        onClick={() => mutation.mutate()}
        disabled={isUpdatingWishlist}
      >
        {isUpdatingWishlist ? <LoadingSpinner color="#ea4b48" radiusInPx={18} /> : <DeleteIcon />}
      </Button>
    </div>
  );
};
export default WishlistTableActions;
