import { Icon, Stack, Text, TypographyProps } from '@chakra-ui/react';
import { FaPeopleGroup } from 'react-icons/fa6';

import { EventProps } from '../../types';

interface EventParticipantsProps {
  noIcon?: boolean;
  fontSize?: TypographyProps['fontSize'];
  capacity: EventProps['capacity'];
  participants: EventProps['participants'];
}

export const EventParticipants = ({ noIcon, fontSize = 'sm', capacity, participants }: EventParticipantsProps) => (
  <Stack direction="row">
    {noIcon ? null : <Icon as={FaPeopleGroup} color="purple.500" />}
    <Text fontWeight="medium" fontSize={fontSize}>
      {`${participants.length} participant${participants.length === 1 ? '' : 's'} / ${capacity}`}
    </Text>
  </Stack>
);
