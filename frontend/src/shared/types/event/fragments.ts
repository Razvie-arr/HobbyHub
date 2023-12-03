import { FragmentType, getFragmentData, gql } from '../../../gql';

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
      ... on User {
        __typename
        id
        first_name
        last_name
        email
      }
      ... on Group {
        __typename
        id
        name
        admin {
          id
          first_name
          last_name
          email
        }
      }
    }
    location {
      ...LocationFragment
    }
    summary
    description
    image_filepath
    capacity
    allow_waitlist
    participants {
      user {
        id
        first_name
        last_name
        email
      }
      state
      text
    }
  }
`);

export type EventFragmentType = FragmentType<typeof EventFragment>;

export const getEventFragmentData = (event: EventFragmentType) => getFragmentData(EventFragment, event);

