import type { Product } from '@/services/supabase/products';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  isShoppingCartDrawerOpen: boolean;
  setIsShoppingCartDrawerOpen: (value: boolean) => void;

  items: CartItem[];
  addItem: (product: Product) => void;
  increaseQuantity: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  decreaseQuantity: (productId: string) => void;
  removeItem: (product: Product) => void;
  clearCart: () => void;
};

const useCartStore = create<CartStore, [['zustand/persist', unknown]]>(
  persist(
    set => ({
      isShoppingCartDrawerOpen: false,
      setIsShoppingCartDrawerOpen: (value: boolean) => set({ isShoppingCartDrawerOpen: value }),

      items: [],
      addItem: (product: Product) =>
        set(state => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        }),
      removeItem: (product: Product) =>
        set(state => {
          return { items: state.items.filter(item => item.product.id !== product.id) };
        }),
      clearCart: () => set({ items: [] }),
      increaseQuantity: (productId: string) =>
        set(state => {
          const existingItem = state.items.find(item => item.product.id === productId);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }
          return state;
        }),
      decreaseQuantity: (productId: string) =>
        set(state => {
          const existingItem = state.items.find(item => item.product.id === productId);
          if (existingItem) {
            if (existingItem.quantity === 1) {
              return { items: state.items.filter(item => item.product.id !== productId) };
            }
            return {
              items: state.items.map(item =>
                item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
              ),
            };
          }
          return state;
        }),
      changeQuantity: (productId: string, quantity: number) =>
        set(state => {
          const existingItem = state.items.find(item => item.product.id === productId);
          if (existingItem) {
            if (quantity < 1) {
              return state;
            }
            return {
              items: state.items.map(item =>
                item.product.id === productId ? { ...item, quantity } : item,
              ),
            };
          }
          return state;
        }),
    }),

    { name: 'shopping-cart', storage: createJSONStorage(() => localStorage) },
  ),
);

export default useCartStore;
