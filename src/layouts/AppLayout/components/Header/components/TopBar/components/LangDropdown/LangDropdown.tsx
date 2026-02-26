import { DropDown } from '@/components/DropDown/DropDown';
import { languages } from '@/i18n/languages';
import { useTranslation } from 'react-i18next';

const LangDropdown = () => {
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <DropDown
      options={languages}
      value={i18n.language}
      onChange={handleChange}
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

export default LangDropdown;
