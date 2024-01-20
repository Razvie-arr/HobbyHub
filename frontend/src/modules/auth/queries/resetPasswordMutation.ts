import { gql } from 'src/gql';

export const RESET_PASSWORD_MUTATION = gql(/* GraphQL */ `
  mutation ResetPassword($email: String!, $password: String!, $token: String!) {
    requestResetPassword(email: $email)
    resetPassword(password: $password, token: $token)
  }
`);
