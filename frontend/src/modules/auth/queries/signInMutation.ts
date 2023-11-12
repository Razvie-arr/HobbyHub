import { gql } from 'src/gql';

export const SIGN_IN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        email
        first_name
        last_name
        verified
        location_id
        description
        location {
          id
          country
          city
          street_name
          street_number
          latitude
          longitude
        }
        event_types {
          id
          name
          category
        }
      }
      token
    }
  }
`);
