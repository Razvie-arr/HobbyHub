import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

import { Resolvers } from '../types';

import { messageSenderResolver, sendMessageResolver } from './modules/chat/messageResolvers';
import {
  threadByIdResolver,
  threadLastMessageResolver,
  threadMessagesResolver,
  threadsResolver,
  threadUsersResolver,
} from './modules/chat/threadResolvers';
import {
  createEventResolver,
  deleteEventResolver,
  editEventResolver,
  eventAuthorResolver,
  eventByIdResolver,
  eventEventTypesResolver,
  eventLocationResolver,
  eventParticipantsResolver,
  eventsByIdsResolver,
  eventsResolver,
  filterEventResolver,
  interestingNearbyEventsResolver,
  newlyCreatedNearbyEventsResolver,
  similarEventsResolver,
  todaysNearbyEventsResolver,
  uploadEventImageResolver,
} from './modules/event/eventResolvers';
import {
  eventTypeByIdResolver,
  eventTypesByIdsResolver,
  eventTypesResolver,
} from './modules/eventType/eventTypeResolvers';
import { locationByIdResolver, locationsByIdsResolver, locationsResolver } from './modules/location/locationResolvers';
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
import {
  editUserResolver,
  onboardUserResolver,
  userByIdResolver,
  userEventTypesResolver,
  userLocationResolver,
  usersByIdsResolver,
  usersResolver,
} from './modules/user/userResolvers';

export const rootResolver: Resolvers = {
  Query: {
    events: eventsResolver,
    eventById: eventByIdResolver,
    eventsByIds: eventsByIdsResolver,

    eventTypes: eventTypesResolver,
    eventTypeById: eventTypeByIdResolver,
    eventTypesByIds: eventTypesByIdsResolver,

    locations: locationsResolver,
    locationById: locationByIdResolver,
    locationsByIds: locationsByIdsResolver,

    newlyCreatedNearbyEvents: newlyCreatedNearbyEventsResolver,
    todaysNearbyEvents: todaysNearbyEventsResolver,
    interestingNearbyEvents: interestingNearbyEventsResolver,
    similarEvents: similarEventsResolver,

    searchEvents: searchEventsResolver,

    filterEvents: filterEventResolver,

    users: usersResolver,
    userById: userByIdResolver,
    usersByIds: usersByIdsResolver,

    threads: threadsResolver,
    threadById: threadByIdResolver,
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
    uploadEventImage: uploadEventImageResolver,

    editUser: editUserResolver,
    onboardUser: onboardUserResolver,

    sendMessage: sendMessageResolver,
  },

  Upload: GraphQLUpload,

  User: {
    event_types: userEventTypesResolver,
    location: userLocationResolver,
  },

  Thread: {
    users: threadUsersResolver,
    messages: threadMessagesResolver,
    lastMessage: threadLastMessageResolver,
  },

  Message: {
    sender: messageSenderResolver,
  },
};
