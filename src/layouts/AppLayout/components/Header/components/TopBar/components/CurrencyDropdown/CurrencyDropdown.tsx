import { DropDown } from '@/components/DropDown/DropDown';
import { currencies } from '@/constants/currencies';
import useAppStore from '@/store/useAppStore';

const CurrencyDropdown = () => {
  const currency = useAppStore(s => s.currency);
  const setCurrency = useAppStore(s => s.setCurrency);

  return (
    <DropDown
      options={currencies}
      value={currency}
      onChange={setCurrency}
      gap="0.5rem"
      colors={{
        trigger: 'text-gray-300',
        option: 'text-xs text-gray-600 hover:text-gray-300!',
        active: 'text-xs text-gray-300',
        bg: 'bg-gray-800',
      }}
      className="text-xs"
    />
  );
};

export default CurrencyDropdown;
