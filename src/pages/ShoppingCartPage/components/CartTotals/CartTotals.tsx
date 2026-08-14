import { Button } from '@/components/Buttons/Button/Button';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import { routePaths } from '@/router/routePaths';
import useCartStore from '@/store/useCartStore';
import { useNavigate } from 'react-router-dom';

const spanClassname = 'text-gray-700 text-sm';
const priceClassname = 'font-bold text-gray-900 text-sm';
const liClassname = 'w-full flex justify-between py-3';

const CartTotals = () => {
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
      <h4 className="text-xl text-gray-900 font-medium">Cart Total</h4>
      <ul className="list-none *:not-last:border-b *:not-last:border-gray-100">
        <li className={liClassname}>
          <span className={spanClassname}>Subtotal:</span>
          <PriceDisplay price={subtotal} priceClassName={priceClassname} />
        </li>
        <li className={liClassname}>
          <span className={spanClassname}>Shipping:</span>
          <PriceDisplay price={shippingCost} priceClassName={priceClassname} />
        </li>
        <li className={liClassname}>
          <span className={spanClassname}>Total:</span>
          <PriceDisplay price={total} priceClassName={priceClassname} />
        </li>
      </ul>
      <Button className="py-3" onClick={handleCheckout} disabled={items.length === 0}>
        Proceed to checkout
      </Button>
    </div>
  );
};

export default CartTotals;
