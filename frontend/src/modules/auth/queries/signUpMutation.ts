import { gql } from 'src/gql';

export const SIGN_UP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($email: String!, $first_name: String!, $last_name: String!, $password: String!) {
    signUp(email: $email, first_name: $first_name, last_name: $last_name, password: $password) {
      user {
        id
        first_name
        last_name
        email
      }
      token
    }
  }
`);

