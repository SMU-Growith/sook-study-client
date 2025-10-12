import { useMemo, useState } from 'react';
import { Input } from './Input';

interface DropdownListProps {
  options: string[];
  isSearchable?: boolean;
  onSelect: (value: string) => void;
}

const DropdownList = ({ options, isSearchable, onSelect }: DropdownListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = useMemo(() => {
    if (!isSearchable || !searchTerm) return options;
    return options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [options, searchTerm, isSearchable]);

  const handleSelectOption = (option: string) => {
    onSelect(option);
    if (isSearchable) setSearchTerm('');
  };

  return (
    <ul
      className="absolute z-10 mt-1 max-h-60 overflow-auto 
          rounded-[10px] border-2 border-gray-200 bg-white p-[12px] text-body-2-semibold justify-center items-center"
    >
      {isSearchable && (
        <div className="mb-[10px]">
          <Input
            className="rounded-[22px]"
            placeholder="전공을 입력해주세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      {filteredOptions.length > 0 ? (
        filteredOptions.map((option) => (
          <li
            key={option}
            className="px-5 py-2 hover:bg-gray-200 rounded-[10px] cursor-pointer"
            onClick={() => {
              handleSelectOption(option);
            }}
          >
            {option}
          </li>
        ))
      ) : (
        <li className="px-5 py-2 text-gray-300">검색 결과가 없습니다.</li>
      )}
    </ul>
  );
};

export { DropdownList };
