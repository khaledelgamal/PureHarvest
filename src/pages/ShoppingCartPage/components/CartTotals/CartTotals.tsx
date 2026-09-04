import { routePaths } from '@/router/routePaths';
import useCartStore from '@/store/useCartStore';
import CartTotalsList from '@/components/CartTotalsList/CartTotalsList';
import { useTranslation } from 'react-i18next';
import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';

const CartTotals = () => {
  const { t } = useTranslation('pages/ShoppingCartPage');
  const items = useCartStore(state => state.items);
  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost = 0;
  const total = subtotal + shippingCost;

  return (
    <div className="w-full xl:max-w-[424px] h-fit border border-gray-100 rounded-lg p-6 flex flex-col gap-2">
      <h4 className="text-xl text-gray-900 font-medium">{t('cartTotal', 'Cart Total')}</h4>
      <CartTotalsList subtotal={subtotal} shippingCost={shippingCost} total={total} />
      <ButtonLink
        className="py-3 text-center w-full sm:w-fit xl:w-full"
        to={routePaths.SHOPPING_CART.CHECKOUT.path}
        disabled={items.length === 0}
      >
        {t('proceedToCheckout', 'Proceed to checkout')}
      </ButtonLink>
    </div>
  );
};

export default CartTotals;
