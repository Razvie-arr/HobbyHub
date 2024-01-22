import { NonEmptyArray } from 'effect/ReadonlyArray';

import { DocumentType } from '../../../gql';

import { UserProfileFragment } from './fragments';

export type UserProfileData = DocumentType<typeof UserProfileFragment>;

export interface WithUserProfile {
  userProfile: UserProfileData;
}

export interface WithUserProfiles {
  userProfiles: Array<UserProfileData>;
}

export interface WithNonEmptyUserProfiles {
  userProfiles: NonEmptyArray<UserProfileData>;
}

