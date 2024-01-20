import { gql } from '../../gql';

export const EVENTS = gql(`
  query Events($offset: Int, $limit: Int) {
    events(offset: $offset, limit: $limit) {
      ...EventFragment
    }
  }
`);

export const TODAYS_NEARBY_EVENTS = gql(`
  query TodaysNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {
    todaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {
      ...EventFragment
    }
  }
`);

export const INTERESTING_NEARBY_EVENTS = gql(`
  query InterestingNearbyEvents($longitude: Float!, $latitude: Float!, $userId: Int! $offset: Int, $limit: Int) {
    interestingNearbyEvents(longitude: $longitude, latitude: $latitude, userId: $userId, offset: $offset, limit: $limit) {
      ...EventFragment
    }
  }
`);

export const NEWLY_CREATED_NEARBY_EVENTS = gql(`
  query NewlyCreatedNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {
    newlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {
      ...EventFragment
    }
  }
`);

export const EVENT = gql(`
  query Event($eventId: Int!) {
    eventById(id: $eventId) {
      ...EventFragment
    }
  }
`);

export const FILTERED_EVENTS = gql(`
  query FilterEvents($userId: Int, $offset: Int, $limit: Int, $eventTypeIds: [Int!], $startDatetime: String, $endDatetime: String, $filterLocation: FilterLocationInput, $sort: SortType) {
    filterEvents(user_id: $userId, offset: $offset, limit: $limit, eventTypeIds: $eventTypeIds, start_datetime: $startDatetime, end_datetime: $endDatetime, filterLocation: $filterLocation, sort: $sort) {
      ...EventFragment
    }
  }
`);

export const SIMILAR_EVENTS = gql(`
  query SimilarEvents($userId: Int, $eventId: Int!, $city: String!, $eventTypeIds: [Int!]!) {
    similarEvents(user_id: $userId, eventId: $eventId, city: $city, eventTypeIds: $eventTypeIds) {
      ...EventFragment
    }
  }
`);

