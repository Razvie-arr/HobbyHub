import { useState } from 'react';
import { Icon, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

interface SearchInputProps {
  onSearch: (searchValue: string) => Promise<void>;
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [, setParams] = useSearchParams();

  const handleSearch = async () => {
    await onSearch(searchValue);
    setParams({ searchValue });
  };

  return (
    <InputGroup size="md">
      <Input
        type="search"
        placeholder="Search..."
        size="lg"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={async (event) => {
          if (event.key === 'Enter') {
            await handleSearch();
          }
        }}
        variant="flushed"
        autoFocus
      />
      <InputRightElement>
        <IconButton
          borderLeftRadius="none"
          aria-label="Search event"
          icon={<Icon as={MdSearch} />}
          variant="ghost"
          colorScheme="purple"
          onClick={handleSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
};

