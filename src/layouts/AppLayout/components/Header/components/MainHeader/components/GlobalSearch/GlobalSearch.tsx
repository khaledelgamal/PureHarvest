import { Button } from '@/components/Buttons/Button/Button';
import SearchIcon from '@/icons/SearchIcon';
import { useTranslation } from 'react-i18next';

const GlobalSearch = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center gap-0">
      <div className="max-w-[400px] flex items-center gap-2 pl-4 py-3 rounded-l-md border border-r-0 border-gray-100  ">
        <SearchIcon className="text-gray-900 w-5 h-5" />
        <input
          type="text"
          placeholder={t(
            'layouts.AppLayout.components.Header.components.MainHeader.GlobalSearch.placeholder',
            'Search',
          )}
          className=" placeholder:text-gray-500 outline-none"
        />
      </div>
      <Button
        variant="fill"
        size="md"
        className="rounded-r-md rounded-l-none font-semibold text-sm"
      >
        {t(
          'layouts.AppLayout.components.Header.components.MainHeader.GlobalSearch.search',
          'Search',
        )}
      </Button>
    </div>
  );
};
export default GlobalSearch;
