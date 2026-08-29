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
import { useTranslation } from 'react-i18next';

type ItemAdditionState = 'in-cart' | 'not-in-cart' | 'added-to-cart';
const WishlistTableActions = ({ item }: { item: WishlistItem }) => {
  const { t } = useTranslation('pages/WishlistPage');
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const userId = useAuthStore(state => state.user?.id);
  const addToCart = useCartStore(state => state.addItem);
  const cartItems = useCartStore(state => state.items);
  const setIsShoppingCartDrawerOpen = useCartStore(state => state.setIsShoppingCartDrawerOpen);

  const mutation = useMutation({
    mutationFn: async () => {
      await wishlistsAPI.removeFromWishlist(item.userId, item.productId);
    },

    onMutate: () => {
      setIsUpdatingWishlist(true);
    },

    onSuccess: () => {
      toast.message(
        t('removedFromWishlist', '{{name}} removed from wishlist.', {
          name: item.product?.name || 'Product',
        }),
      );
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
      toast.error(
        t('failedToRemove', 'Failed to remove {{name}} from wishlist. Please try again.', {
          name: item.product?.name || 'Product',
        }),
      );
    },

    onSettled: () => {
      setIsUpdatingWishlist(false);
    },
  });

  const handleAddToCart = () => {
    if (item.product) {
      addToCart(item.product);
      toast.success(
        t('addedToCartToast', 'Added {{count}}x {{name}} to your cart', {
          name: item.product.name,
          count: 1,
        })
      );
      setIsShoppingCartDrawerOpen(true);
    } else {
      toast.error(
        t(
          'errorRequestingProduct',
          'Error requesting this product. Please contact support at ({{email}}).',
          { email: contactSupport.email },
        ),
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
          ? t('alreadyInCart', 'Already In Cart')
          : itemAdditionState === 'not-in-cart'
            ? t('addToCart', 'Add to Cart')
            : t('addedToCart', 'Added to Cart')}
      </Button>
      <Button
        variant="rounded"
        className={styles.deleteButton}
        size="sm"
        title={t('removeFromWishlist', 'Remove from wishlist')}
        onClick={() => mutation.mutate()}
        disabled={isUpdatingWishlist}
      >
        {isUpdatingWishlist ? <LoadingSpinner color="#ea4b48" radiusInPx={18} /> : <DeleteIcon />}
      </Button>
    </div>
  );
};
export default WishlistTableActions;
