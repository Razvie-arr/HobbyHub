import { Stack } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { ContentContainer } from '../../../shared/layout';
import { WithAuthUser, WithEvent } from '../../../shared/types';

import { ReviewEventMember } from './ReviewEventMember';

export const ReviewEventMembers = ({ user, event }: WithAuthUser & WithEvent) => {
  const owner = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  return (
    <ContentContainer maxW="lg">
      <Stack mt={12} spacing={6}>
        {user.id === owner.id ? (
          event.participants.map(({ id, ...other }) => (
            <ReviewEventMember key={id} eventId={event.id} user={user} member={{ id, ...other }} />
          ))
        ) : (
          <ReviewEventMember key={owner.id} eventId={event.id} user={user} member={owner} />
        )}
      </Stack>
    </ContentContainer>
  );
};

