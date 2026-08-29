import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useCartStore from '@/store/useCartStore';
import { useFormatPrice } from '@/hooks/useFormatPrice';

const ShoppingCart = () => {
  const { t } = useTranslation('layouts/AppLayout');
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
      <div className="relative">
        <ShoppingCartIcon className="w-8 h-8 stroke-[1.5]" />
        <span className="absolute -top-1 -right-1 bg-primary-hard text-white rounded-full w-4.5 h-4.5 flex items-center justify-center text-[10px] font-medium">
          {cardItems.length}
        </span>
      </div>
      <div className="hidden md:flex flex-col items-start">
        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-hard transition-colors">
          {formatPrice(totalPrice)}
        </p>
      </div>
    </button>
  );
};
export default ShoppingCart;
