import { gql } from 'src/gql';

export const VERIFY_USER = gql(`
  mutation Mutation($token: String!) {
    verify(token: $token)
  }
`);

