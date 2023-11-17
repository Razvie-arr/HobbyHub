import { AuthUser } from '../../gql/graphql';

export interface WithAuthUser {
  user: AuthUser;
}

export interface WithNullableAuthUser {
  user: AuthUser | null;
}

export interface WithOnboardedUser {
  user: AuthUser & { location: NonNullable<AuthUser['location']> };
}
