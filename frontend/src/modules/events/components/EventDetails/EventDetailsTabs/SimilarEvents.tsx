import { useQuery } from '@apollo/client';
import { Flex } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { QueryResult } from '../../../../../shared/layout';
import { renderEventList } from '../../../../../shared/renderers/renderEventList';
import { getLocationFragmentData, WithEvent, WithNullableAuthUser } from '../../../../../shared/types';
import { SIMILAR_EVENTS } from '../../../queries';

import { MoreEventsLikeThisCard } from './MoreEventsLikeThisCard';

export const SimilarEvents = ({ user, event }: WithNullableAuthUser & WithEvent) => {
  const authorId = match(event.author)
    .with({ __typename: 'User' }, ({ id }) => id)
    .with({ __typename: 'Group' }, ({ admin }) => admin.id)
    .exhaustive();

  const isCurrentUserOrganizer = user && user.id === authorId;

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
        additionalCards: isCurrentUserOrganizer ? null : <MoreEventsLikeThisCard />,
      })}
      renderOnNoData={
        isCurrentUserOrganizer ? (
          `We found no events similar to ${event.name}`
        ) : (
          <Flex flexWrap="wrap" columnGap="4" justifyContent={{ base: 'center', md: 'start' }}>
            <MoreEventsLikeThisCard />
          </Flex>
        )
      }
    />
  );
};

