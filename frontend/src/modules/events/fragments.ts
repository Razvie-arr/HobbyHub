import { FragmentType, getFragmentData, gql } from '../../gql';

export const EventFragment = gql(/* GraphQL */ `
  fragment EventFragment on Event {
    id
    name
    start_datetime
    end_datetime
    event_types {
      id
      name
    }
    author {
      id
      name
    }
    location {
      id
      country
      city
      street_name
      street_number
      longitude
      latitude
    }
    summary
    description
    image_filePath
    capacity
    allow_waitlist
    participants {
      id
      name
    }
  }
`);

export type EventFragmentType = FragmentType<typeof EventFragment>;

export const getEventFragmentData = (event: EventFragmentType) => getFragmentData(EventFragment, event);

