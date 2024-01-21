import { gql } from 'src/gql';

export const VERIFY_USER = gql(`
  mutation VerifyUser($token: String!) {
    verify(token: $token)
  }
`);

