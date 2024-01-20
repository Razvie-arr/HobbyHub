import { Flex } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';
import { match } from 'ts-pattern';

import { ParticipantState } from '../../../../../gql/graphql';
import { NoData } from '../../../../../shared/design-system';
import { WithEvent, WithNullableAuthUser } from '../../../../../shared/types';

import { EventParticipantItem } from './EventParticipantItem';

export const EventParticipants = ({ event, user }: WithEvent & WithNullableAuthUser) => {
  const organizer = match(event.author)
    .with({ __typename: 'User' }, (author) => author)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  const isUserOrganizer = user && user.id === organizer.id;

  return (
    <Flex justifyContent="space-between" flexWrap="wrap">
      {pipe(
        Option.fromNullable(event.participants),
        Option.filter(ReadonlyArray.isNonEmptyArray),
        Option.map(
          ReadonlyArray.filterMap((participant) =>
            isUserOrganizer || participant.state === ParticipantState.Accepted
              ? Option.some(
                  <EventParticipantItem
                    key={participant.user.id}
                    user={user}
                    event={event}
                    participant={participant}
                  />,
                )
              : Option.none(),
          ),
        ),
        Option.filter(ReadonlyArray.isNonEmptyArray),
        Option.getOrElse(() => <NoData description={`There are no participants for ${event.name} yet`} />),
      )}
    </Flex>
  );
};

