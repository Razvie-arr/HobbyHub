import { gql } from '../../gql';

export const CREATE_EVENT = gql(`
  mutation CreateEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {
    createEvent(event: $event, location: $location) {
      ...EventFragment
    }
  }
`);

export const EDIT_EVENT = gql(`
  mutation EditEvent($event: EventInput!, $location: LocationInputWithoutCoords!) {
    editEvent(event: $event, location: $location) {
      ...EventFragment
    }
}
`);

export const DELETE_EVENT = gql(`
  mutation DeleteEvent($eventId: Int!, $locationId: Int!) {
    deleteEvent(event_id: $eventId, location_id: $locationId) 
  }
`);

export const CANCEL_EVENT = gql(`
  mutation CancelEvent($eventId: Int!) {
    cancelEvent(eventId: $eventId)
  }
`);

export const UPLOAD_EVENT_IMAGE = gql(`
  mutation UploadEventImage($eventImage: Upload) {
    uploadEventImage(event_image: $eventImage)
}
`);

export const REQUEST_EVENT_REGISTRATION = gql(`
  mutation RequestEventRegistration($eventRegistration: RequestEventRegistrationInput!) {
    requestEventRegistration(eventRegistration: $eventRegistration)
  }
`);

export const RESOLVE_EVENT_REGISTRATION = gql(`
  mutation ResolveEventRegistration($resolve: ResolveEventRegistrationInput!) {
    resolveEventRegistration(resolve: $resolve)
  }
`);

export const SEND_MASS_MESSAGE = gql(`
  mutation MassEmailToEventParticipants($eventId: Int!, $emailSubject: String!, $emailBody: String!) {
    massEmailToEventParticipants(eventId: $eventId, emailSubject: $emailSubject, emailBody: $emailBody)
  }
`);

export const SEND_MORE_EVENTS_LIKE_THIS_MESSAGE = gql(`
  mutation MoreEventsLikeThis($sender: UserEmailInput!, $recipient: UserEmailInput!, $event: EventEmailInput!, $emailBody: String!) {
    moreEventsLikeThis(sender: $sender, recipient: $recipient, event: $event, emailBody: $emailBody)
  }
`);

