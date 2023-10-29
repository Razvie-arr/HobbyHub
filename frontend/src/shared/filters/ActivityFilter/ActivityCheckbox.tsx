import { Checkbox, HStack, Text } from '@chakra-ui/react';

import { EventType } from '../../../gql/graphql';
import { EventTypeTag } from '../../design-system';

interface ActivityFilterProps {
  eventType: Omit<EventType, 'category'>;
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ActivityCheckbox = ({ eventType, handleChange, isChecked }: ActivityFilterProps) => (
  <HStack key={eventType.id} flexBasis="31%" mb="4">
    <Checkbox colorScheme="purple" size="lg" isChecked={isChecked} onChange={handleChange}>
      <HStack>
        <EventTypeTag borderRadius="full" eventType={eventType} />
        <Text ml="2">{eventType.name}</Text>
      </HStack>
    </Checkbox>
  </HStack>
);

