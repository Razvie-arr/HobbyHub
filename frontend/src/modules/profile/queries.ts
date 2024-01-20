import { gql } from '../../gql';

export const USER_PROFILE = gql(`
  query UserProfile($userId: Int!) {
    userById(id: $userId) {
      ...UserProfileFragment
    }
  }
`);

export const USER_CREATED_EVENTS = gql(`
  query UserCreatedEvents($userId: Int!, $offset: Int, $limit: Int) {
    userCreatedEvents(userId: $userId, offset: $offset, limit: $limit) {
        ...EventFragment
      }
    }
`);

export const USER_CREATED_GROUPS = gql(`
  query UserAdminGroups($userId: Int!, $offset: Int, $limit: Int) {
    userAdminGroups(userId: $userId, offset: $offset, limit: $limit) {
        ...GroupFragment
      }
    }
`);

export const USER_RECEIVED_REVIEWS = gql(`
  query ReviewsByUserId($userId: Int!, $offset: Int, $limit: Int) {
    reviewsByUserId(userId: $userId, offset: $offset, limit: $limit) {
      id
      text
      rating
      reviewer {
        first_name
        email
        id
        last_name
      }
      event {
        ...EventFragment
      }
    }
  }
`);

