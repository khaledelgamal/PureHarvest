import { Link } from 'react-router-dom';
import { routePaths } from '@/router/routePaths';
import type { Product } from '@/services/supabase/products/types';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import Star from '../../../Star/Star';
import { Button } from '@/components/Buttons/Button/Button';
import AddToCartIcon from '@/icons/AddToCartIcon';
import { wishlistKeys, wishlistsAPI } from '@/services/supabase/wishlists';
import useAuthStore from '@/store/useAuthStore';
import { useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import WishlistIcon from '@/icons/WishlistIcon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCartStore from '@/store/useCartStore';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation('pages/ShopPage');
  const user = useAuthStore(state => state.user!);
  const [inWishlist, setInWishlist] = useState<boolean>(product.inWishlist || false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState<boolean>(false);
  const cardItems = useCartStore(state => state.items);

  const addItemToCart = useCartStore(state => state.addItem);
  const setIsShoppingCartDrawerOpen = useCartStore(state => state.setIsShoppingCartDrawerOpen);
  const queryClient = useQueryClient();

  const removeFromWishlistMutation = useMutation({
    mutationFn: async () => {
      await wishlistsAPI.removeFromWishlist(user.id, product.id);
    },
    onMutate: () => {
      setIsUpdatingWishlist(true);
    },

    onSuccess: () => {
      toast.message(
        t('removedFromWishlist', '{{name}} removed from wishlist.', { name: product.name }),
      );
      queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user?.id) });
      setInWishlist(false);
    },

    onError: error => {
      console.log(error);
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
      if (!user)
        throw new Error(
          t('mustBeLoggedInWishlist', 'You must be logged in to modify your wishlist.'),
        );
      await wishlistsAPI.addToWishlist(user.id, product.id);
    },
    onMutate: () => {
      setIsUpdatingWishlist(true);
    },

    onSuccess: () => {
      toast.success(t('addedToWishlist', '{{name}} added to wishlist.', { name: product.name }));
      queryClient.invalidateQueries({ queryKey: wishlistKeys.list(user?.id) });
      setInWishlist(true);
    },

    onError: error => {
      console.log(error);
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

  const handleWishlist = async () => {
    try {
      if (inWishlist) {
        await removeFromWishlistMutation.mutateAsync();
      } else {
        await addToWishlistMutation.mutateAsync();
      }
    } catch (error) {
      console.log(error);
      toast.error(t('failedToUpdateWishlist', 'Failed to update wishlist. Please try again.'));
    } finally {
      setIsUpdatingWishlist(false);
    }
  };
  const handleClickAddToCart = () => {
    if (cardItems.some(item => item.product.id === product.id)) {
      setIsShoppingCartDrawerOpen(true);
    } else {
      addItemToCart(product);
    }
  };
  const isItemInCart = cardItems.some(item => item.product.id === product.id);

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:border-primary duration-300">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.salePrice && (
          <span className="bg-danger text-white text-xs font-semibold px-2 py-1 rounded">
            {t('sale', 'Sale')}
          </span>
        )}
        {product.stockStatus === 'out_of_stock' && (
          <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
            {t('outOfStock', 'Out of Stock')}
          </span>
        )}
      </div>

      {/* Hover actions top right */}
      <div className={`absolute top-4 right-4 z-10 flex flex-col gap-2`}>
        <Button
          variant="rounded"
          className="group/wishlist bg-white!"
          title={
            inWishlist
              ? t('removeFromWishlist', 'Remove from wishlist')
              : t('addToWishlist', 'Add to wishlist')
          }
          onClick={handleWishlist}
          disabled={isUpdatingWishlist}
        >
          {isUpdatingWishlist ? (
            <LoadingSpinner radiusInPx={16} borderWidth={1} loadingSpeed={0.8} color="#00b207" />
          ) : (
            <WishlistIcon
              className={`w-5 h-5 text-gray-900 fill-white transition-colors duration-300  ${inWishlist ? 'fill-red-500! text-red-500!' : 'group-hover/wishlist:fill-red-500! group-hover/wishlist:text-red-500!'}`}
            />
          )}
        </Button>
      </div>

      {/* Image */}
      <Link
        to={routePaths.SHOP.ITEM_DETAILS.path(product.id)}
        className="block aspect-square p-6 relative"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full  object-contain rounded-2xl transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex cardItems-center justify-center text-gray-400">
            {t('noImage', 'No Image')}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1 relative">
        <Link to={routePaths.SHOP.ITEM_DETAILS.path(product.id)}>
          <h3
            title={product.name}
            className="text-gray-700  hover:text-primary transition-colors overflow-hidden text-ellipsis text-nowrap"
          >
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between cardItems-center">
          <div>
            <div className="flex cardItems-center gap-2 mt-1">
              <PriceDisplay
                price={product.salePrice || product.price}
                oldPrice={product.salePrice ? product.price : undefined}
              />
            </div>

            <div className="flex cardItems-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  fillPercentage={Math.min(1, Math.max(0, (product.ratingAvg || 0) - (star - 1)))}
                />
              ))}
            </div>
          </div>
          <Button
            className={`flex-center py-0 px-0 w-10 h-10 rounded-full bg-gray-50 group-hover:bg-primary relative ${isItemInCart ? 'bg-primary' : ''}`}
            title={
              cardItems.some(item => item.product.id === product.id)
                ? t('viewCart', 'View Cart')
                : t('addToCart', 'Add to Cart')
            }
            onClick={handleClickAddToCart}
          >
            {/* show quantity over the icon */}
            {isItemInCart && (
              <span className="p-1! flex-center aspect-square rounded-full absolute -left-2 -top-2 w-[75%] bg-primary-hard text-white text-xs font-semibold">
                {(cardItems.find(item => item.product.id === product.id)?.quantity || 0) > 99
                  ? '+99'
                  : cardItems.find(item => item.product.id === product.id)?.quantity}
              </span>
            )}

            <AddToCartIcon
              className={`w-5 h-5 text-gray-900 group-hover:text-white ${isItemInCart ? 'text-white' : ''}`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100"></div>
      <div className="p-4 flex flex-col gap-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/4 mt-1"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-1"></div>
      </div>
    </div>
  );
};
