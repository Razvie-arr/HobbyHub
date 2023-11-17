import { FragmentType, getFragmentData, gql } from '../../../gql';

export const GroupFragment = gql(/* GraphQL */ `
  fragment GroupFragment on Group {
    id
    name
    admin {
      id
      first_name
      last_name
    }
    event_types {
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
    events {
      ...EventFragment
    }
    members {
      id
      first_name
      last_name
    }
    summary
    description
    image_filepath
  }
`);

export type GroupFragmentType = FragmentType<typeof GroupFragment>;

export const getGroupFragmentData = (event: GroupFragmentType) => getFragmentData(GroupFragment, event);
