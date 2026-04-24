import type { OrderItem } from '@/services/supabase/orders/types';

const PLACEHOLDER_IMAGE = '/images/placeholder-product.png';

type OrderProductsTableProps = {
  items: OrderItem[];
};

export const OrderProductsTable = ({ items }: OrderProductsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-y border-gray-100">
            {['Product', 'Price', 'Quantity', 'Subtotal'].map(col => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-medium
                           text-gray-700 uppercase"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {items.map(item => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
              {/* Product */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.productImage ?? PLACEHOLDER_IMAGE}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.productName}</span>
                </div>
              </td>

              {/* Price */}
              <td className="px-6 py-4 text-sm text-gray-600">${item.price.toFixed(2)}</td>

              {/* Quantity */}
              <td className="px-6 py-4 text-sm text-gray-600">x{item.quantity}</td>

              {/* Subtotal */}
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                ${item.subtotal.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
