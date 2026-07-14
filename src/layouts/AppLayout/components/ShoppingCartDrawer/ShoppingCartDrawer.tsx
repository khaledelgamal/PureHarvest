import { useEffect } from 'react';
import CloseButton from '@/components/Buttons/CloseButton/CloseButton';
import useCartStore from '@/store/useCartStore';
import CartItem from './components/CartItem/CartItem';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { routePaths } from '@/router/routePaths';

export default function ShoppingCartDrawer() {
  const isShoppingCartDrawerOpen = useCartStore(state => state.isShoppingCartDrawerOpen);
  const cardItems = useCartStore(state => state.items);
  const setIsShoppingCartDrawerOpen = useCartStore(state => state.setIsShoppingCartDrawerOpen);

  useEffect(() => {
    if (isShoppingCartDrawerOpen) {
      // prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isShoppingCartDrawerOpen]);

  const totalPrice = cardItems.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${
          isShoppingCartDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsShoppingCartDrawerOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out p-10 flex flex-col ${
          isShoppingCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-4 mb-4">
          <h2 className="text-xl font-medium">Shopping Cart ({cardItems.length})</h2>
          <CloseButton onClick={() => setIsShoppingCartDrawerOpen(false)} />
        </div>
        <div className="overflow-y-auto flex-1">
          {/* Cart items */}
          <div className="flex flex-col items-center justify-start h-full text-gray-500">
            {cardItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cardItems.map(item => {
                return <CartItem key={item.product.id} item={item} />;
              })
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex justify-between">
            <span>{cardItems.length} Products</span>
            <PriceDisplay price={totalPrice} priceClassName="font-medium" size="sm" />
          </div>
          <div className="flex flex-col gap-3">
            <ButtonLink
              variant="fill"
              size="md"
              to={routePaths.SHOPPING_CART.CHECKOUT.path}
              onClick={() => setIsShoppingCartDrawerOpen(false)}
              className="text-center"
            >
              Checkout
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              size="md"
              to={routePaths.SHOPPING_CART.ROOT}
              onClick={() => setIsShoppingCartDrawerOpen(false)}
              className="text-center"
            >
              Go To Cart
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
