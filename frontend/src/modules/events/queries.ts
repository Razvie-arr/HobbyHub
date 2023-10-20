import { gql } from '../../gql';

export const GET_EVENTS = gql(`
  query GetEvents($offset: Int, $limit: Int) {
    getEvents(offset: $offset, limit: $limit) {
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

export const GET_TODAYS_NEARBY_EVENTS = gql(`
  query GetTodaysNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {
    getTodaysNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {
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

export const GET_NEWLY_CREATED_NEARBY_EVENTS = gql(`
  query GetNewlyCreatedNearbyEvents($longitude: Float!, $latitude: Float!, $offset: Int, $limit: Int) {
    getNewlyCreatedNearbyEvents(longitude: $longitude, latitude: $latitude, offset: $offset, limit: $limit) {
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

