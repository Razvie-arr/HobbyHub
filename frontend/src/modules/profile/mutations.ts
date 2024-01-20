import { gql } from '../../gql';

export const EDIT_PROFILE = gql(`
  mutation EditUser($user: UserInput!, $location: LocationInputWithoutCoords!) {
    editUser(user: $user, location: $location) {
      id
      event_types {
        id
        category
        name
      }
    }
  }
`);

