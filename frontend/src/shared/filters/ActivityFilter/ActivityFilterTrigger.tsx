import { Badge, Button, Icon, PopoverTrigger } from '@chakra-ui/react';
import { MdOutlineExpandMore } from 'react-icons/md';

import { EventType } from '../../../gql/graphql';

interface ActivityFilterTriggerProps {
  label: string;
  selectedEventTypes: Array<EventType>;
}

export const ActivityFilterTrigger = ({ selectedEventTypes, label }: ActivityFilterTriggerProps) => {
  const hasSelectedEventTypes = selectedEventTypes.length > 0;
  return (
    <PopoverTrigger>
      <Button
        rightIcon={<Icon as={MdOutlineExpandMore} />}
        colorScheme="purple"
        variant={hasSelectedEventTypes ? 'solid' : 'outline'}
        size={{ base: 'sm', md: 'md' }}
        borderRadius="full"
      >
        {label}
        {hasSelectedEventTypes ? (
          <Badge ml="2" bg="purple.100" px="1" size="lg">
            {selectedEventTypes.length}
          </Badge>
        ) : null}
      </Button>
    </PopoverTrigger>
  );
};

