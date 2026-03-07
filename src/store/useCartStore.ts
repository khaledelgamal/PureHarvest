import { create } from 'zustand';

type CartStore = {
  totalPrice: number;
  totalQuantity: number;
  setTotalPrice: (price: number) => void;
  setTotalQuantity: (quantity: number) => void;
};

const useCartStore = create<CartStore>(set => ({
  totalPrice: 300.598,
  totalQuantity: 10,
  setTotalPrice: price => set({ totalPrice: price }),
  setTotalQuantity: quantity => set({ totalQuantity: quantity }),
}));

export default useCartStore;
