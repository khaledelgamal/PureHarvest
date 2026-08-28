import { Button } from '@/components/Buttons/Button/Button';
import { routePaths } from '@/router/routePaths';
import useCartStore from '@/store/useCartStore';
import { useNavigate } from 'react-router-dom';
import CartTotalsList from '@/components/CartTotalsList/CartTotalsList';
import { useTranslation } from 'react-i18next';

const CartTotals = () => {
  const { t } = useTranslation('pages/ShoppingCartPage');
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    navigate(routePaths.SHOPPING_CART.CHECKOUT.path);
  };

  return (
    <div className="w-full xl:max-w-[424px] h-fit border border-gray-100 rounded-lg p-6 flex flex-col gap-2">
      <h4 className="text-xl text-gray-900 font-medium">{t('cartTotal', 'Cart Total')}</h4>
      <CartTotalsList subtotal={subtotal} shippingCost={shippingCost} total={total} />
      <Button className="py-3" onClick={handleCheckout} disabled={items.length === 0}>
        {t('proceedToCheckout', 'Proceed to checkout')}
      </Button>
    </div>
  );
};

export default CartTotals;
