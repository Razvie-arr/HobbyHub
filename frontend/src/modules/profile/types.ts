import { User } from '../../gql/graphql';

export type UserProfile = Omit<User, 'blockedBy' | 'blocking' | 'events' | 'groups' | 'location_id' | 'verified'>;

export interface WithUserProfile {
  userProfile: UserProfile;
}

