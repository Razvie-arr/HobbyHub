import { useState } from 'react';
import { Icon, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { route } from '../../../route';

interface SearchInput {
  onSearch: (searchValue: string) => Promise<void>;
}

export const SearchInput = ({ onSearch }: SearchInput) => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const navigateToSearchResults = () => {
    navigate({
      pathname: route.search(),
      search: createSearchParams({ searchValue }).toString(),
    });
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
            await onSearch(searchValue);
            navigateToSearchResults();
          }
        }}
        variant="flushed"
      />
      <InputRightElement>
        <IconButton
          borderLeftRadius="none"
          aria-label="Search event"
          icon={<Icon as={MdSearch} />}
          variant="ghost"
          colorScheme="purple"
          onClick={() => {
            navigateToSearchResults();
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

