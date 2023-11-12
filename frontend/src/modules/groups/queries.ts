import { gql } from '../../gql';

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
