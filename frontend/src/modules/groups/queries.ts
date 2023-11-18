import { gql } from '../../gql';

export const GROUPS = gql(`
  query Groups($offset: Int, $limit: Int) {
    groups(offset: $offset, limit: $limit) {
      ...GroupFragment
    }
  }
`);

export const GROUP = gql(`
  query GroupById($groupId: Int!) {
    groupById(id: $groupId) {
      ...GroupFragment
    }
  }
`);

export const FILTERED_GROUPS = gql(`
  query FilterGroups($offset: Int, $limit: Int, $eventTypeIds: [Int!], $filterLocation: FilterLocationInput, $sort: GroupSortType) {
    filterGroups(offset: $offset, limit: $limit, eventTypeIds: $eventTypeIds, filterLocation: $filterLocation, sort: $sort) {
      ...GroupFragment
    }
  }
`);

export const LOCATION_AWARE_GROUPS = gql(`
  query GetLocationAwareGroups($userId: Int!, $longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {
    nearbyGroups(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {
      ...GroupFragment
    }
    interestingNearbyGroups(
      longitude: $longitude
      latitude: $latitude
      userId: $userId
      offset: $offset
      limit: $limit
    ) {
      ...GroupFragment
    }
  }
`);

export const SIMILAR_GROUPS = gql(`
  query SimilarGroups($groupId: Int!, $city: String!, $eventTypeIds: [Int!]!) {
    similarGroups(groupId: $groupId, city: $city, eventTypeIds: $eventTypeIds) {
      ...GroupFragment
    }
  }
`);

