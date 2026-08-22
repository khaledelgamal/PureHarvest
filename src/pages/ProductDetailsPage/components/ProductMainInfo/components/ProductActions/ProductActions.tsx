import { useState, useEffect } from 'react';
import QuantityInput from '@/components/Inputs/QuantityInput/QuantityInput';
import { Button } from '@/components/Buttons/Button/Button';
import { AddToWishlistButton } from '@/components/Buttons/AddToWishlistButton/AddToWishlistButton';
import ShoppingBagIcon from '@/icons/ShoppingBagIcon';
import { Check } from 'lucide-react';
import useCartStore from '@/store/useCartStore';
import type { Product } from '@/services/supabase/products/types';
import { useProductWishlist } from './hooks/useProductWishlist';
import { classNames } from '@/utils';

interface ProductActionsProps {
  product: Product;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const cartItems = useCartStore(state => state.items);
  const addItemToCart = useCartStore(state => state.addItem);
  const changeQuantity = useCartStore(state => state.changeQuantity);
  const setIsShoppingCartDrawerOpen = useCartStore(state => state.setIsShoppingCartDrawerOpen);

  const cartItem = cartItems.find(item => item.product.id === product.id);
  const isItemInCart = !!cartItem;

  const [quantity, setQuantity] = useState<number>(cartItem?.quantity || 1);
  const { inWishlist, isUpdatingWishlist, handleWishlistToggle } = useProductWishlist(product);

  const handleIncrease = () => {
    const nextQuantity = quantity + 1;
    setQuantity(nextQuantity);
    if (isItemInCart) {
      changeQuantity(product.id, nextQuantity);
    }
  };

  const handleDecrease = () => {
    const nextQuantity = Math.max(1, quantity - 1);
    setQuantity(nextQuantity);
    if (isItemInCart) {
      changeQuantity(product.id, nextQuantity);
    }
  };

  const handleAddToCart = () => {
    if (isItemInCart) return;
    addItemToCart(product);
    if (quantity > 1) {
      changeQuantity(product.id, quantity);
    }
    setIsShoppingCartDrawerOpen(true);
  };

  return (
    <div className="flex items-center flex-wrap gap-4 border-y border-gray-200 py-6">
      <QuantityInput
        value={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        className="max-w-[150px] flex-shrink-0"
      />

      <Button
        onClick={handleAddToCart}
        disabled={isItemInCart || product.stockStatus === 'out_of_stock'}
        className={classNames(
          'flex-1 min-w-[200px] max-w-[400px] h-[50px] flex items-center justify-center gap-2 rounded-full text-base font-semibold transition-all',
          isItemInCart
            ? 'bg-primary-soft/30 text-primary-hard border-primary-soft/40 cursor-not-allowed opacity-90'
            : '',
        )}
      >
        {isItemInCart ? (
          <>
            Added to Cart <Check className="w-5 h-5" />
          </>
        ) : (
          <>
            Add to Cart <ShoppingBagIcon className="w-5 h-5" />
          </>
        )}
      </Button>

      <AddToWishlistButton
        variant={inWishlist ? 'active' : 'default'}
        isLoading={isUpdatingWishlist}
        onClick={handleWishlistToggle}
        className="w-[50px] h-[50px] rounded-full flex-shrink-0 bg-primary-soft/20 text-primary hover:bg-primary-soft/30 border-none flex items-center justify-center"
      />
    </div>
  );
};

export default ProductActions;
