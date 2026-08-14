import React from 'react';
import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import useCartStore from '@/store/useCartStore';
import QuantityInput from '@/components/Inputs/QuantityInput/QuantityInput';
import { useFormatPrice } from '@/hooks/useFormatPrice';

import styles from './ShoppingCartTable.module.css';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';

const ShoppingCartTable = () => {
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const increaseQuantity = useCartStore(state => state.increaseQuantity);
  const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
  const formatPrice = useFormatPrice();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.shoppingCartTable}>
        <thead>
          <tr>
            <th className={styles.thProduct}>PRODUCT</th>
            <th className={styles.thPrice}>PRICE</th>
            <th className={styles.thQuantity}>QUANTITY</th>
            <th className={styles.thSubtotal}>SUBTOTAL</th>
            <th className={styles.thAction}></th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map(item => (
              <tr key={item.product.id}>
                <td>
                  <div className={styles.productCell}>
                    {item.product.imageUrl && (
                      <img
                        src={item.product.imageUrl}
                        className={styles.productImage}
                        alt={item.product.name}
                      />
                    )}
                    <p className={styles.productName}>{item.product.name}</p>
                  </div>
                </td>
                <td>
                  <PriceDisplay
                    price={item.product.salePrice ? item.product.salePrice : item.product.price}
                    oldPrice={item.product.salePrice ? item.product.price : undefined}
                  />
                </td>
                <td>
                  <div className="max-w-36">
                    <QuantityInput
                      value={item.quantity}
                      onIncrease={() => increaseQuantity(item.product.id)}
                      onDecrease={() => decreaseQuantity(item.product.id)}
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.subtotal}>
                    {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end">
                    <DeleteButton
                      title="Remove from Cart"
                      onClick={() => removeItem(item.product)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <div className="text-gray-900 py-8 text-center text-lg">
                  Your shopping cart is empty.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingCartTable;
