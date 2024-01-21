import { gql } from '../../gql';

export const EDIT_PROFILE = gql(`
  mutation EditUser($user: UserInput!, $location: LocationInputWithoutCoords!) {
    editUser(user: $user, location: $location) {
      id
      first_name
      last_name
      description
      email
      event_types {
        id
        category
        name
      }
      location {
        ...LocationFragment
      }
    }
  }
`);

export const CHANGE_PASSWORD = gql(`
  mutation ChangePassword($id: Int!, $password: String!) {
    changePassword(id: $id, password: $password)
  }
`);

