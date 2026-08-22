import { useState, useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistKeys, wishlistsAPI } from '@/services/supabase/wishlists';
import { toast } from 'sonner';
import type { Product } from '@/services/supabase/products/types';

export const useProductWishlist = (product: Product) => {
  const user = useAuthStore(state => state.user);
  const [inWishlist, setInWishlist] = useState<boolean>(product.inWishlist || false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setInWishlist(product.inWishlist || false);
  }, [product.inWishlist]);

  const removeFromWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('You must be logged in to modify your wishlist.');
      await wishlistsAPI.removeFromWishlist(user.id, product.id);
    },
    onMutate: () => {
      setIsUpdatingWishlist(true);
    },
    onSuccess: () => {
      toast.message(`${product.name} removed from wishlist.`);
      queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user?.id) });
      setInWishlist(false);
    },
    onError: error => {
      console.error(error);
      toast.error(`Failed to remove ${product.name} from wishlist. Please try again.`);
    },
    onSettled: () => {
      setIsUpdatingWishlist(false);
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('You must be logged in to modify your wishlist.');
      await wishlistsAPI.addToWishlist(user.id, product.id);
    },
    onMutate: () => {
      setIsUpdatingWishlist(true);
    },
    onSuccess: () => {
      toast.success(`${product.name} added to wishlist.`);
      queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user?.id) });
      setInWishlist(true);
    },
    onError: error => {
      console.error(error);
      toast.error(`Failed to add ${product.name} to wishlist. Please try again.`);
    },
    onSettled: () => {
      setIsUpdatingWishlist(false);
    },
  });

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error('You must be logged in to modify your wishlist.');
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
      toast.error('Failed to update wishlist. Please try again.');
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
