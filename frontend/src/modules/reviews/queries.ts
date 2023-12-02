import { gql } from '../../gql';

export const EVENT = gql(`
  query Query($eventId: Int!) {
    eventById(id: $eventId) {
      ...EventFragment
    }
  }
`);

