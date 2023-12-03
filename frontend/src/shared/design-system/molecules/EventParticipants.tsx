import { Icon, Stack, Text, TypographyProps } from '@chakra-ui/react';
import { FaPeopleGroup } from 'react-icons/fa6';

import { ParticipantState } from '../../../gql/graphql';
import { EventData } from '../../types';

interface EventParticipantsProps {
  noIcon?: boolean;
  fontSize?: TypographyProps['fontSize'];
  capacity: EventData['capacity'];
  participants: EventData['participants'];
}

export const EventParticipants = ({ noIcon, fontSize = 'sm', capacity, participants }: EventParticipantsProps) => {
  const acceptedParticipants = participants.filter(({ state }) => state === ParticipantState.Accepted);
  return (
    <Stack direction="row">
      {noIcon ? null : <Icon as={FaPeopleGroup} color="purple.500" />}
      <Text fontWeight="medium" fontSize={fontSize}>
        {`${acceptedParticipants.length} participant${acceptedParticipants.length === 1 ? '' : 's'} / ${
          capacity as number
        }`}
      </Text>
    </Stack>
  );
};

