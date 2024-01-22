import { gql } from 'src/gql';

export const RESET_PASSWORD_MUTATION = gql(/* GraphQL */ `
  mutation ResetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token)
  }
`);

