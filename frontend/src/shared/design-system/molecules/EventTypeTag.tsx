import { BorderProps, Tag, Tooltip } from '@chakra-ui/react';

import { EventType } from '../../../gql/graphql';
import { EventTypeName } from '../../types';
import { EventTypeIcon } from '../atoms';

interface EventTypeTagProps {
  borderRadius?: BorderProps['borderRadius'];
  eventType: Omit<EventType, 'category'>;
}
export const EventTypeTag = ({ borderRadius, eventType }: EventTypeTagProps) => (
  <Tooltip key={eventType.name} label={eventType.name}>
    <Tag colorScheme="purple" borderRadius={borderRadius} size="lg">
      <EventTypeIcon eventTypeName={eventType.name as EventTypeName} />
    </Tag>
  </Tooltip>
);
