import { useEffect } from 'react';
import CloseButton from '@/components/Buttons/CloseButton/CloseButton';
import useCartStore from '@/store/useCartStore';
import CartItem from './components/CartItem/CartItem';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { routePaths } from '@/router/routePaths';
import { useTranslation } from 'react-i18next';

export default function ShoppingCartDrawer() {
  const { t } = useTranslation('layouts/AppLayout');
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
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out p-6 md:p-10 flex flex-col ${
          isShoppingCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-3 md:pb-4 mb-3 md:mb-4 border-b border-gray-100 md:border-none">
          <h2 className="text-lg md:text-xl font-medium">
            {t('shoppingCartWithCount', 'Shopping Cart ({{count}})', { count: cardItems.length })}
          </h2>
          <CloseButton onClick={() => setIsShoppingCartDrawerOpen(false)} />
        </div>
        <div className="overflow-y-auto flex-1">
          {/* Cart items */}
          <div className="flex flex-col items-center justify-start h-full text-gray-500">
            {cardItems.length === 0 ? (
              <p className="mt-10">{t('emptyCart', 'Your cart is empty.')}</p>
            ) : (
              cardItems.map(item => {
                return <CartItem key={item.product.id} item={item} />;
              })
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-6 pt-4 border-t border-gray-100 md:border-none md:pt-0">
          <div className="flex justify-between text-sm md:text-base">
            <span className="text-gray-600 md:text-gray-900">
              {t('productsCount', '{{count}} Products', { count: cardItems.length })}
            </span>
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
              {t('checkout', 'Checkout')}
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              size="md"
              to={routePaths.SHOPPING_CART.ROOT}
              onClick={() => setIsShoppingCartDrawerOpen(false)}
              className="text-center"
            >
              {t('goToCart', 'Go To Cart')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
