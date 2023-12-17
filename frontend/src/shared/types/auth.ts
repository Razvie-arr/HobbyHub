import { SignInMutation } from '../../gql/graphql';

type AuthToken = SignInMutation['signIn']['token'];
type AuthUser = SignInMutation['signIn']['user'];

export interface AuthState {
  token: AuthToken | null;
  user: AuthUser | null;
}

export interface WithAuthUser {
  user: AuthUser;
}

export interface WithNullableAuthUser {
  user: AuthUser | null;
}

export interface WithOnboardedUser {
  user: AuthUser & { location: NonNullable<AuthUser['location']> };
}

