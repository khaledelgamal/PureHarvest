import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import type { Product } from '@/services/supabase/products/types';
import useCartStore from '@/store/useCartStore';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';

type CartItem = {
  product: Product;
  quantity: number;
};
interface CartItemProps {
  item: CartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const removeItem = useCartStore(state => state.removeItem);

  const handleDeleteItemFromCart = () => {
    removeItem(item.product);
  };

  return (
    <div className="w-full flex justify-between items-center gap-4 py-4 hover:bg-gray-50 transition-colors px-2 rounded-lg group">
      <div className="flex gap-4 items-center justify-start flex-1 min-w-0">
        {/* Product Image */}
        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center p-1">
          {item.product.imageUrl ? (
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-gray-400 text-xs text-center">No image</span>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-start justify-start flex-1 min-w-0">
          <p
            title={item.product.name}
            className="text-gray-900 font-medium text-base leading-tight line-clamp-2 mb-1"
          >
            {item.product.name}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <PriceDisplay price={item.product.salePrice || item.product.price} />
            <span className="text-gray-400 text-sm mx-1">×</span>
            <span className=" none font-semibold text-gray-700 bg-gray-100 max-w-20 min-w-10 text-center px-0! rounded-md border-transparent focus:ring-0 outline-none">
              {item.quantity}
            </span>
          </div>
        </div>
      </div>

      {/* Actions & Total Price */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <DeleteButton
          title="Remove from Cart"
          onClick={handleDeleteItemFromCart}
          className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
        />
      </div>
    </div>
  );
};

export default CartItem;
