import { gql } from '../../gql';

export const SEARCH_EVENTS = gql(`
  query SearchEvents($text: String!, $offset: Int, $limit: Int) {
    searchEvents(text: $text, offset: $offset, limit: $limit) {
      ...EventFragment
    }
  }
`);

export const SEARCH_GROUPS = gql(`
  query SearchGroups($text: String!, $offset: Int, $limit: Int) {
    searchGroups(text: $text, offset: $offset, limit: $limit) {
      ...GroupFragment
    }
  }
`);

