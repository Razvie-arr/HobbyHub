import { Icon, Stack, Text } from '@chakra-ui/react';
import { FaPeopleGroup } from 'react-icons/fa6';

import { EventProps } from '../../types';

interface EventParticipantsProps {
  capacity: EventProps['capacity'];
  participants: EventProps['participants'];
}

export const EventParticipants = ({ capacity, participants }: EventParticipantsProps) => (
  <Stack direction="row">
    <Icon as={FaPeopleGroup} color="purple.500" />
    <Text fontWeight="medium" fontSize="sm">
      {`${participants.length} participant${participants.length > 1 ? 's' : ''} / ${capacity}`}
    </Text>
  </Stack>
);

