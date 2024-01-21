import { useQuery } from '@apollo/client';
import { Flex } from '@chakra-ui/react';
import { identity } from 'effect';
import { match } from 'ts-pattern';

import { QueryResult } from 'src/shared/layout';
import { renderEventList } from 'src/shared/renderers/renderEventList';
import { getLocationFragmentData, WithEvent, WithNullableAuthUser } from 'src/shared/types';

import { SIMILAR_EVENTS } from '../../../../queries';

import { MoreEventsLikeThisCard } from './MoreEventsLikeThisCard';

export const SimilarEvents = ({ user, event }: WithNullableAuthUser & WithEvent) => {
  const author = match(event.author)
    .with({ __typename: 'User' }, identity)
    .with({ __typename: 'Group' }, ({ admin }) => admin)
    .exhaustive();

  return (
    <QueryResult
      queryResult={useQuery(SIMILAR_EVENTS, {
        variables: {
          userId: user?.id,
          eventId: event.id,
          eventTypeIds: event.event_types.map(({ id }) => id),
          city: getLocationFragmentData(event.location).city,
        },
      })}
      queryName="similarEvents"
      render={renderEventList({
        user,
        maxColumnCount: 3,
        additionalCards:
          !user || (user && user.id === author.id) ? null : (
            <MoreEventsLikeThisCard user={user} recipient={author} event={event} />
          ),
      })}
      renderOnNoData={
        !user || (user && user.id === author.id) ? (
          `We found no events similar to ${event.name}`
        ) : (
          <Flex flexWrap="wrap" columnGap="4" justifyContent={{ base: 'center', md: 'start' }}>
            <MoreEventsLikeThisCard user={user} recipient={author} event={event} />
          </Flex>
        )
      }
    />
  );
};

