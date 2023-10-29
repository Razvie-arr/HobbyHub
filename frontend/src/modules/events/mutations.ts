import { gql } from '../../gql';

export const CREATE_EVENT = gql(`
  mutation CreateEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {
    createEvent(event: $event, location: $location) {
      id
    }
  }
`);

export const EDIT_EVENT = gql(`
  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {
    editEvent(event: $event, location: $location) {
      id
    }
}
`);

export const DELETE_EVENT = gql(`
  mutation DeleteEvent($eventId: Int!, $locationId: Int!) {
    deleteEvent(event_id: $eventId, location_id: $locationId)
  }
`);

