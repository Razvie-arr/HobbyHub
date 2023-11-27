import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

import { Resolvers } from '../types';

import {
  messagesByThreadIdResolver,
  messageSenderResolver,
  sendMessageResolver,
} from './modules/chat/messageResolvers';
import {
  editReadThreadResolver,
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
import {
  createGroupResolver,
  deleteGroupResolver,
  editGroupResolver,
  filterGroupsResolver,
  groupAdminResolver,
  groupByIdResolver,
  groupEventsResolver,
  groupEventTypesResolver,
  groupLocationResolver,
  groupMembersResolver,
  groupsByIdsResolver,
  groupsResolver,
  interestingNearbyGroupsResolver,
  nearbyGroupsResolver,
  similarGroupsResolver,
  uploadGroupImageResolver,
} from './modules/group/groupResolvers';
import { locationByIdResolver, locationsByIdsResolver, locationsResolver } from './modules/location/locationResolvers';
import { reviewByIdResolver, reviewReviewerResolver, reviewUserResolver } from './modules/Review/reviewResolver';
import { searchEventsResolver, searchGroupsResolver } from './modules/search/searchResolver';
import {
  authUserAdminGroupsResolver,
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
  userEventsResolver,
  userEventTypesResolver,
  userGroupsResolver,
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
    messagesByThreadId: messagesByThreadIdResolver,

    groups: groupsResolver,
    groupById: groupByIdResolver,
    groupsByIds: groupsByIdsResolver,
    filterGroups: filterGroupsResolver,
    nearbyGroups: nearbyGroupsResolver,
    interestingNearbyGroups: interestingNearbyGroupsResolver,
    similarGroups: similarGroupsResolver,

    searchGroups: searchGroupsResolver,

    reviewById: reviewByIdResolver,
  },

  AuthUser: {
    event_types: authUserEventTypesResolver,
    location: authUserLocationResolver,
    groups: authUserAdminGroupsResolver,
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

    createGroup: createGroupResolver,
    editGroup: editGroupResolver,
    deleteGroup: deleteGroupResolver,
    uploadGroupImage: uploadGroupImageResolver,

    sendMessage: sendMessageResolver,
    editReadThread: editReadThreadResolver,
  },

  Upload: GraphQLUpload,

  User: {
    event_types: userEventTypesResolver,
    location: userLocationResolver,
    events: userEventsResolver,
    groups: userGroupsResolver,
  },

  Group: {
    admin: groupAdminResolver,
    location: groupLocationResolver,
    members: groupMembersResolver,
    events: groupEventsResolver,
    event_types: groupEventTypesResolver,
  },
  Review: {
    user: reviewUserResolver,
    reviewer: reviewReviewerResolver,
  },

  Author: {
    __resolveType: (obj) => {
      // @ts-expect-error
      if (obj.email) {
        return 'User';
      }
      // @ts-expect-error
      if (obj.admin_id) {
        return 'Group';
      }
      return null; // GraphQLError is thrown
    },
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
