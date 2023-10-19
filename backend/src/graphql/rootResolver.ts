import { Resolvers } from '../types';

import {
  eventAuthorResolver,
  eventEventTypesResolver,
  eventLocationResolver,
  eventParticipantsResolver,
  getEventByIdResolver,
  getEventsResolver,
  getNewlyCreatedNearbyEventsResolver,
  getTodaysNearbyEventsResolver,
} from './modules/event/eventResolvers';
import { eventTypeResolver, eventTypesResolver } from './modules/eventType/eventTypeResolvers';
import { locationResolver, locationsResolver } from './modules/location/locationResolvers';
import { signInResolver, signUpResolver, verifyUser } from './modules/user/authResolvers';

export const rootResolver: Resolvers = {
  Query: {
    getEventById: getEventByIdResolver,
    getEvents: getEventsResolver,

    getEventTypeById: eventTypeResolver,
    getEventTypes: eventTypesResolver,

    getLocationById: locationResolver,
    getLocations: locationsResolver,

    getNewlyCreatedNearbyEvents: getNewlyCreatedNearbyEventsResolver,
    getTodaysNearbyEvents: getTodaysNearbyEventsResolver,
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
    verify: verifyUser,
  },
};
