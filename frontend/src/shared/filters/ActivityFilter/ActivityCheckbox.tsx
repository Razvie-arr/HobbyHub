import { Checkbox, HStack, Tag, Text, Tooltip } from '@chakra-ui/react';

import { EventType } from '../../../gql/graphql';
import { EventTypeName } from '../../../modules/events/types';
import { EventTypeIcon } from '../../design-system';

interface ActivityFilterProps {
  eventType: Omit<EventType, 'category'>;
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ActivityCheckbox = ({ eventType, handleChange, isChecked }: ActivityFilterProps) => (
  <HStack key={eventType.id} flexBasis="31%" mb="4">
    <Checkbox colorScheme="purple" size="lg" isChecked={isChecked} onChange={handleChange}>
      <HStack>
        <Tooltip key={eventType.name} label={eventType.name}>
          <Tag colorScheme="purple" borderRadius="full" size="lg">
            <EventTypeIcon eventTypeName={eventType.name as EventTypeName} />
          </Tag>
        </Tooltip>
        <Text ml="2">{eventType.name}</Text>
      </HStack>
    </Checkbox>
  </HStack>
);

