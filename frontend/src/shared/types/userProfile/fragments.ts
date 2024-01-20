import { FragmentType, getFragmentData, gql } from '../../../gql';

export const UserProfileFragment = gql(/* GraphQL */ `
  fragment UserProfileFragment on User {
    id
    email
    first_name
    last_name
    description
    average_rating
    event_types {
      id
      name
      category
    }
    location {
      ...LocationFragment
    }
    blockedBy {
      id
    }
    blocking {
      id
    }
  }
`);

export type UserProfileFragmentType = FragmentType<typeof UserProfileFragment>;

export const getUserProfileFragmentData = (event: UserProfileFragmentType) =>
  getFragmentData(UserProfileFragment, event);

