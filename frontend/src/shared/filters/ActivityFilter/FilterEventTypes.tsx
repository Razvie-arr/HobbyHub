import { useEffect, useState } from 'react';
import { Button, Icon, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { pipe, String } from 'effect';
import { MdSearch } from 'react-icons/md';

import { EventType } from '../../../gql/graphql';

interface FilterEventTypesProps {
  eventTypes: Array<Omit<EventType, 'category'>>;
  setFilteredEventTypes: (eventTypes: Array<Omit<EventType, 'category'>>) => void;
}

export const FilterEventTypes = ({ eventTypes, setFilteredEventTypes }: FilterEventTypesProps) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const searchString = String.uncapitalize(searchValue);
    setFilteredEventTypes(
      eventTypes.filter((eventType) => pipe(eventType.name, String.uncapitalize, String.includes(searchString))),
    );
  }, [eventTypes, searchValue, setFilteredEventTypes]);

  return (
    <InputGroup>
      <InputLeftElement>
        <Icon as={MdSearch} boxSize={6} />
      </InputLeftElement>
      <Input
        mb="4"
        value={searchValue}
        placeholder="Filter activities"
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      <InputRightElement width="4.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={() => {
            setSearchValue('');
          }}
        >
          Clear
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

