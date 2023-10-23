import { gql } from '../../gql';

export const EVENTS = gql(`
  query Events($offset: Int, $limit: Int) {
    events(offset: $offset, limit: $limit) {
      id
      name
      start_datetime
      end_datetime
      event_types {
        id
        name
      }
      author {
        id
        name
      }
      location {
        country
        city
        street_name
        street_number
        longitude
        latitude
      }
      summary
      description
      image_filePath
      capacity
      allow_waitlist
      participants {
        id
        name
      }
    }
  }
`);

export const TODAYS_NEARBY_EVENTS = gql(`
  query TodaysNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {
    todaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {
      id
      name
      start_datetime
      end_datetime
      event_types {
        id
        name
      }
      author {
        id
        name
      }
      location {
        country
        city
        street_name
        street_number
        longitude
        latitude
      }
      summary
      description
      image_filePath
      capacity
      allow_waitlist
      participants {
        id
        name
      }
    }
  }
`);

export const INTERESTING_NEARBY_EVENTS = gql(`
  query InterestingNearbyEvents($longitude: Float!, $latitude: Float!, $userId: Int! $offset: Int, $limit: Int) {
    interestingNearbyEvents(longitude: $longitude, latitude: $latitude, userId: $userId, offset: $offset, limit: $limit) {
      id
      name
      start_datetime
      end_datetime
      event_types {
        id
        name
      }
      author {
        id
        name
      }
      location {
        country
        city
        street_name
        street_number
        longitude
        latitude
      }
      summary
      description
      image_filePath
      capacity
      allow_waitlist
      participants {
        id
        name
      }
    }
  }
`);

export const NEWLY_CREATED_NEARBY_EVENTS = gql(`
  query NewlyCreatedNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {
    newlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {
      id
      name
      start_datetime
      end_datetime
      event_types {
        id
        name
      }
      author {
        id
        name
      }
      location {
        country
        city
        street_name
        street_number
        longitude
        latitude
      }
      summary
      description
      image_filePath
      capacity
      allow_waitlist
      participants {
        id
        name
      }
    }
  }
`);

