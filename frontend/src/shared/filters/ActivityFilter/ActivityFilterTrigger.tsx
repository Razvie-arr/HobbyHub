import { Badge, Button, Icon, PopoverTrigger } from '@chakra-ui/react';
import { MdOutlineExpandMore } from 'react-icons/md';

import { EventType } from '../../../gql/graphql';

interface ActivityFilterTriggerProps {
  label: string;
  selectedEventTypes: Array<EventType>;
}

export const ActivityFilterTrigger = ({ selectedEventTypes, label }: ActivityFilterTriggerProps) => (
  <PopoverTrigger>
    <Button
      rightIcon={<Icon as={MdOutlineExpandMore} />}
      colorScheme="purple"
      variant="outline"
      size={{ base: 'sm', md: 'md' }}
    >
      {label}
      {selectedEventTypes.length !== 0 ? (
        <Badge ml="2" bg="purple.500" color="white" px="1" size="lg">
          {selectedEventTypes.length}
        </Badge>
      ) : null}
    </Button>
  </PopoverTrigger>
);
