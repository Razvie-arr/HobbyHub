import { AuthUser } from '../../gql/graphql';

export interface WithAuthUser {
  user: AuthUser;
}

