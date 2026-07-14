import AddToCartIcon from '@/icons/AddToCartIcon';
import { useTranslation } from 'react-i18next';
import useCartStore from '@/store/useCartStore';
import { useFormatPrice } from '@/hooks/useFormatPrice';

const ShoppingCart = () => {
  const { t } = useTranslation();
  const cardItems = useCartStore(state => state.items);
  const formatPrice = useFormatPrice();
  const setIsShoppingCartDrawerOpen = useCartStore(state => state.setIsShoppingCartDrawerOpen);
  const handleShoppingCartClick = () => {
    setIsShoppingCartDrawerOpen(true);
  };

  const totalPrice = cardItems.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);
  return (
    <button
      className="flex gap-2.5 items-center cursor-pointer group hover:text-primary-hard transition-colors"
      onClick={handleShoppingCartClick}
    >
      <div className="relative ">
        <AddToCartIcon className="w-8 h-8" />
        <span className="absolute -top-1 right-0 bg-primary-hard  text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] font-medium">
          {cardItems.length}
        </span>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-[11px] text-gray-700 group-hover:text-primary-hard transition-colors">
          {t(
            'layouts.AppLayout.components.Header.components.MainHeader.ShoppingCart.shoppingCart',
            'Shopping Cart',
          )}
          :
        </p>
        <p className="text-sm text-gray-900 group-hover:text-primary-hard transition-colors">
          {formatPrice(totalPrice)}
        </p>
      </div>
    </button>
  );
};
export default ShoppingCart;
