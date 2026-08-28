import { useState, useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistKeys, wishlistsAPI } from '@/services/supabase/wishlists';
import { toast } from 'sonner';
import type { Product } from '@/services/supabase/products/types';
import { useTranslation } from 'react-i18next';

export const useProductWishlist = (product: Product) => {
  const { t } = useTranslation('pages/ProductDetailsPage');
  const user = useAuthStore(state => state.user);
  const [inWishlist, setInWishlist] = useState<boolean>(product.inWishlist || false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setInWishlist(product.inWishlist || false);
  }, [product.inWishlist]);

  const removeFromWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error(t('mustBeLoggedInWishlist', 'You must be logged in to modify your wishlist.'));
      await wishlistsAPI.removeFromWishlist(user.id, product.id);
    },
    onMutate: () => {
      setIsUpdatingWishlist(true);
    },
    onSuccess: () => {
      toast.message(
        t('removedFromWishlist', '{{name}} removed from wishlist.', { name: product.name }),
      );
      queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user?.id || '') });
      setInWishlist(false);
    },
    onError: error => {
      console.error(error);
      toast.error(
        t('failedToRemoveWishlist', 'Failed to remove {{name}} from wishlist. Please try again.', {
          name: product.name,
        }),
      );
    },
    onSettled: () => {
      setIsUpdatingWishlist(false);
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error(t('mustBeLoggedInWishlist', 'You must be logged in to modify your wishlist.'));
      await wishlistsAPI.addToWishlist(user.id, product.id);
    },
    onMutate: () => {
      setIsUpdatingWishlist(true);
    },
    onSuccess: () => {
      toast.success(
        t('addedToWishlist', '{{name}} added to wishlist.', { name: product.name }),
      );
      queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user?.id || '') });
      setInWishlist(true);
    },
    onError: error => {
      console.error(error);
      toast.error(
        t('failedToAddWishlist', 'Failed to add {{name}} to wishlist. Please try again.', {
          name: product.name,
        }),
      );
    },
    onSettled: () => {
      setIsUpdatingWishlist(false);
    },
  });

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error(t('mustBeLoggedInWishlist', 'You must be logged in to modify your wishlist.'));
      return;
    }
    try {
      if (inWishlist) {
        await removeFromWishlistMutation.mutateAsync();
      } else {
        await addToWishlistMutation.mutateAsync();
      }
    } catch (error) {
      console.error(error);
      toast.error(t('failedToUpdateWishlist', 'Failed to update wishlist. Please try again.'));
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  return {
    inWishlist,
    isUpdatingWishlist,
    handleWishlistToggle,
  };
};

export default useProductWishlist;
