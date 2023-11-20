import { Option, pipe, ReadonlyArray } from 'effect';

import { EventType } from '../gql/graphql';

export const getEventTypeIds = (eventTypeCategory: string, eventTypes: Array<EventType>) =>
  pipe(
    eventTypes,
    ReadonlyArray.filterMap(({ category, id }) => (category === eventTypeCategory ? Option.some(id) : Option.none())),
  );

