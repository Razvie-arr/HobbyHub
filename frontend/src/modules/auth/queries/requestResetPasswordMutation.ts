import { gql } from 'src/gql';

export const REQUEST_RESET_PASSWORD_MUTATION = gql(/* GraphQL */ `
  mutation RequestResetPassword($email: String!) {
    requestResetPassword(email: $email)
  }
`);
