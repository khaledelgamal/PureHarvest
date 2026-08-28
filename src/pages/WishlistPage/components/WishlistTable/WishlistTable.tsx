import PriceDisplay from '@/components/PriceDisplay/PriceDisplay';
import useWishlist from './hooks/useWishlist';
import { useTranslation } from 'react-i18next';

import styles from './WishlistTable.module.css';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import WishlistTableActions from './components/WishlistTableActions/WishlistTableActions';

const WishlistTable = () => {
  const { t } = useTranslation('pages/WishlistPage');
  const { data, isFetching: isLoading, error } = useWishlist();

  return (
    <table className={styles.wishlistTable}>
      <thead>
        <tr>
          <th>{t('thProduct', 'PRODUCT')}</th>
          <th>{t('thPrice', 'PRICE')}</th>
          <th>{t('thStockStatus', 'STOCK STATUS')}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={4}>
              <div className="flex-center my-6">
                <LoadingSpinner radiusInPx={40} />
              </div>
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={4}>
              <div className="text-danger py-8 text-center text-sm">
                {error?.message ||
                  'error getting wishlist try contact support (support@pureharvest.com)'}
              </div>
            </td>
          </tr>
        ) : data && data.total > 0 ? (
          data?.items.map((item, index) => (
            <>
              {index > 0 && (
                <tr key={`divider-${item.productId}`}>
                  <td colSpan={4}>
                    <div className={styles.rowDivider}></div>
                  </td>
                </tr>
              )}
              <tr key={item.productId}>
                <td>
                  <div className={styles.productCell}>
                    {item.product?.imageUrl && (
                      <img
                        src={item.product?.imageUrl}
                        className={styles.productImage}
                        alt={item.product?.name}
                      />
                    )}

                    <p className={styles.productName}>{item.product?.name}</p>
                  </div>
                </td>
                <td>
                  <PriceDisplay
                    price={item.product?.price || 0}
                    oldPrice={item.product?.salePrice || undefined}
                  />
                </td>
                <td>
                  {item.product?.stockQuantity || 0 > 0 ? (
                    <span className={styles.stockStatus}>{t('inStock', 'In Stock')}</span>
                  ) : (
                    <span className={styles.stockStatus}>{t('outOfStock', 'Out of Stock')}</span>
                  )}
                </td>
                <td>
                  <WishlistTableActions item={item} />
                </td>
              </tr>
            </>
          ))
        ) : (
          <tr>
            <td colSpan={4}>
              <div className="text-gray-900 py-8 text-center text-lg">
                {t('emptyWishlist', 'Your wishlist is empty.')}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default WishlistTable;
