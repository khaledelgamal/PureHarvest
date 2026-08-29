import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import type { Product } from '@/services/supabase/products/types';
import useCartStore from '@/store/useCartStore';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import QuantityInput from '@/components/Inputs/QuantityInput/QuantityInput';
import { useState, useEffect } from 'react';
import { Button } from '@/components/Buttons/Button/Button';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

type CartItemType = {
  product: Product;
  quantity: number;
};
interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { t } = useTranslation('pages/ShoppingCartPage');
  const removeItem = useCartStore(state => state.removeItem);
  const changeQuantity = useCartStore(state => state.changeQuantity);

  const [draftQuantity, setDraftQuantity] = useState(item.quantity);

  useEffect(() => {
    setDraftQuantity(item.quantity);
  }, [item.quantity]);

  const handleDeleteItemFromCart = () => {
    removeItem(item.product);
  };

  const handleIncrease = () => {
    setDraftQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    setDraftQuantity(prev => Math.max(1, prev - 1));
  };

  const handleConfirmUpdate = () => {
    changeQuantity(item.product.id, draftQuantity);
    toast.success(
      t('cartUpdatedToast', 'Updated {{name}} — now {{count}} in your cart', {
        name: item.product.name,
        count: draftQuantity,
      }),
    );
  };

  const hasChanges = draftQuantity !== item.quantity;

  return (
    <div className="w-full flex justify-between items-start gap-4 py-4 hover:bg-gray-50 transition-colors px-2 rounded-lg group">
      <div className="flex gap-4 items-start justify-start flex-1 min-w-0">
        {/* Product Image */}
        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 flex items-center justify-center p-1 mt-1">
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
        <div className="flex flex-col items-start justify-start flex-1 min-w-0 gap-1.5">
          <p
            title={item.product.name}
            className="text-gray-900 font-medium text-base leading-tight line-clamp-2"
          >
            {item.product.name}
          </p>

          <PriceDisplay price={item.product.salePrice || item.product.price} />

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <QuantityInput
              value={draftQuantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              className="py-1 px-1 h-9 max-w-[110px]"
            />
            {hasChanges && (
              <Button
                onClick={handleConfirmUpdate}
                className="flex items-center h-9 py-0 px-3 text-xs rounded-full bg-primary text-white flex-shrink-0"
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                {t('update', 'Update')}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0 pt-1">
        <DeleteButton
          title="Remove from Cart"
          onClick={handleDeleteItemFromCart}
          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus:opacity-100"
        />
      </div>
    </div>
  );
};

export default CartItem;
