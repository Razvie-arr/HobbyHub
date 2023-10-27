import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { pipe, String } from 'effect';
import { MdSearch } from 'react-icons/md';

import { EventType } from '../../../gql/graphql';

interface FilterEventTypesProps {
  eventTypes: Array<Omit<EventType, 'category'>>;
  setFilteredEventTypes: (eventTypes: Array<Omit<EventType, 'category'>>) => void;
}

export const FilterEventTypes = ({ eventTypes, setFilteredEventTypes }: FilterEventTypesProps) => (
  <InputGroup>
    <Input
      mb="4"
      placeholder="Filter activities"
      onChange={(event) => {
        const searchString = String.uncapitalize(event.target.value);
        setFilteredEventTypes(
          eventTypes.filter((eventType) => pipe(eventType.name, String.uncapitalize, String.includes(searchString))),
        );
      }}
    />
    <InputRightElement>
      <Icon as={MdSearch} boxSize={6} />
    </InputRightElement>
  </InputGroup>
);

