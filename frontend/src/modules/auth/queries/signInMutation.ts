import { gql } from 'src/gql';

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        email
        event_types {
          id
          name
          category
        }
        location {
          longitude
          latitude
        }
      }
      token
    }
  }
`);

