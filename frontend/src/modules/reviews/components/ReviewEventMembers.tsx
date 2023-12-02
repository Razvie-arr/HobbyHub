import { Stack } from '@chakra-ui/react';

import { ContentContainer } from '../../../shared/layout';
import { WithAuthUser, WithEvent } from '../../../shared/types';

import { ReviewEventMember } from './ReviewEventMember';

export const ReviewEventParticipants = ({ user, event }: WithAuthUser & WithEvent) => (
  <ContentContainer maxW="lg">
    <Stack mt={12} spacing={6}>
      {event.participants.map(({ id, ...other }) => (
        <ReviewEventMember key={id} eventId={event.id} user={user} member={{ id, ...other }} />
      ))}
    </Stack>
  </ContentContainer>
);

