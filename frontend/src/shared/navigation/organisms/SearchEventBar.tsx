import { useState } from 'react';
import { Icon, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { route } from '../../../route';

export const SearchEventBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const navigateToSearchResults = () => {
    navigate({
      pathname: route.searchEvents(),
      search: createSearchParams({ searchValue }).toString(),
    });
  };

  return (
    <InputGroup size="md" flexBasis="52%">
      <Input
        type="search"
        placeholder="Search event"
        size="md"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            navigateToSearchResults();
          }
        }}
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

