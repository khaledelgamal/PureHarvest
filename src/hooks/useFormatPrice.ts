import useAppStore from '@/store/useAppStore';

export const useFormatPrice = () => {
  const currency = useAppStore(store => store.currency);

  return (price: number, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };
};
