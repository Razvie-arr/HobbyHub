import { FragmentType, getFragmentData, gql } from '../../../gql';

export const GroupFragment = gql(/* GraphQL */ `
  fragment GroupFragment on Group {
    id
    name
    admin {
      id
      first_name
      last_name
      email
    }
    event_types {
      id
      name
    }
    location {
      ...LocationFragment
    }
    events {
      ...EventFragment
    }
    members {
      id
      first_name
      last_name
      email
    }
    summary
    description
    image_filepath
  }
`);

export type GroupFragmentType = FragmentType<typeof GroupFragment>;

export const getGroupFragmentData = (event: GroupFragmentType) => getFragmentData(GroupFragment, event);

