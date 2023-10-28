import { Resolvers } from '../types';

import {
  createEventResolver,
  deleteEventResolver,
  editEventResolver,
  eventAuthorResolver,
  eventByIdResolver,
  eventEventTypesResolver,
  eventLocationResolver,
  eventParticipantsResolver,
  eventsResolver,
  filterEventResolver,
  interestingNearbyEventsResolver,
  newlyCreatedNearbyEventsResolver,
  similarEventsResolver,
  todaysNearbyEventsResolver,
} from './modules/event/eventResolvers';
import { eventTypeResolver, eventTypesResolver } from './modules/eventType/eventTypeResolvers';
import { locationResolver, locationsResolver } from './modules/location/locationResolvers';
import { searchEventsResolver } from './modules/search/searchResolver';
import {
  authUserEventTypesResolver,
  authUserLocationResolver,
  requestResetPasswordResolver,
  resetPasswordResolver,
  signInResolver,
  signUpResolver,
  verifyUserResolver,
} from './modules/user/authResolvers';

export const rootResolver: Resolvers = {
  Query: {
    eventById: eventByIdResolver,
    events: eventsResolver,

    eventTypeById: eventTypeResolver,
    eventTypes: eventTypesResolver,

    locationById: locationResolver,
    locations: locationsResolver,

    newlyCreatedNearbyEvents: newlyCreatedNearbyEventsResolver,
    todaysNearbyEvents: todaysNearbyEventsResolver,
    interestingNearbyEvents: interestingNearbyEventsResolver,
    similarEvents: similarEventsResolver,

    searchEvents: searchEventsResolver,

    filterEvents: filterEventResolver,
  },

  AuthUser: {
    event_types: authUserEventTypesResolver,
    location: authUserLocationResolver,
  },

  Event: {
    author: eventAuthorResolver,
    location: eventLocationResolver,
    event_types: eventEventTypesResolver,
    participants: eventParticipantsResolver,
  },

  Mutation: {
    signIn: signInResolver,
    signUp: signUpResolver,
    verify: verifyUserResolver,
    requestResetPassword: requestResetPasswordResolver,
    resetPassword: resetPasswordResolver,

    createEvent: createEventResolver,
    editEvent: editEventResolver,
    deleteEvent: deleteEventResolver,
  },
};

