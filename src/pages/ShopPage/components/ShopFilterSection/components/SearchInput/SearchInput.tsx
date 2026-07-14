import { SearchIcon } from 'lucide-react';
import { useSearchFilter } from './hooks/useSearchFilter';

interface SearchInputProps {
  initialSearch: string;
  onSearchChange: (value: string | null) => void;
}

export const SearchInput = ({ initialSearch, onSearchChange }: SearchInputProps) => {
  const { searchState, setSearchState } = useSearchFilter(initialSearch, onSearchChange);

  return (
    <div className="flex items-center gap-2 px-4 py-[14px] rounded-md border border-gray-100 bg-white">
      <SearchIcon className="text-gray-900 w-5 h-5 shrink-0" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchState}
        onChange={e => setSearchState(e.target.value)}
        className="w-full placeholder:text-gray-500 outline-none text-gray-900 bg-transparent"
      />
    </div>
  );
};
