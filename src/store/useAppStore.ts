import { create } from 'zustand';
import { defaultCurrency } from '@/constants/currencies';

type AppStore = {
  currency: string;
  setCurrency: (currency: string) => void;
};

const useAppStore = create<AppStore>(set => ({
  currency: defaultCurrency,
  setCurrency: currency => set({ currency }),
}));

export default useAppStore;
