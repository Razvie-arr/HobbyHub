import { GraphQLError } from 'graphql/error';

import { sendEmail } from '../../../libs/nodeMailer';
import {
  AuthUser,
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Event,
  EventType,
  Group,
  Location,
  MutationBlockUserArgs,
  MutationEditUserArgs,
  MutationOnboardUserArgs,
  MutationUnblockUserArgs,
  QueryUserByIdArgs,
  QueryUsersArgs,
  QueryUsersByIdsArgs,
  User,
} from '../../../types';
import { createUserInput } from '../../../utils/helpers';

export const usersResolver: ContextualResolver<Array<User>, QueryUsersArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.users.getAll(offset, limit);

export const userByIdResolver: ContextualNullableResolver<User, QueryUserByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.users.getById(id);

export const usersByIdsResolver: ContextualResolver<Array<User>, QueryUsersByIdsArgs> = async (
  _,
  { ids },
  { dataSources },
) => await dataSources.sql.users.getByIds(ids);

export const userEventTypesResolver: ContextualResolverWithParent<Array<EventType>, User> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.users.getUserEventTypes(parent.id);

export const userLocationResolver: ContextualResolverWithParent<Location, User> = async (parent, _, { dataSources }) =>
  parent.location_id
    ? ((await dataSources.sql.locations.getById(parent.location_id)) as unknown as Location)
    : (null as unknown as Location);

export const userEventsResolver: ContextualResolverWithParent<Array<Event>, User> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.users.getUserEvents(parent.id);

export const userGroupsResolver: ContextualResolverWithParent<Array<Group>, User> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.users.getUserGroups(parent.id);

export const userBlockingResolver: ContextualResolverWithParent<Array<User>, User> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.users.getUserBlocking(parent.id);

export const userBlockedByResolver: ContextualResolverWithParent<Array<User>, User> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.users.getUserBlockedBy(parent.id);

export const editUserResolver = async (
  _: unknown,
  { location, user }: MutationEditUserArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  if (!user.id) {
    throw new GraphQLError('User id must be filled!');
  }
  if (!user.location_id && !location.id) {
    throw new GraphQLError('Location id must be filled!');
  }
  if (user.event_type_ids.some((eventTypeId) => !eventTypeId)) {
    throw new GraphQLError('EventTypeId needs to be filled in order to update!');
  }

  location.id = location.id ? location.id : user.location_id;
  await dataSources.sql.locations.updateLocation(location, googleMapsClient);

  await dataSources.sql.eventTypes.updateUser_EventTypeRelation(user.id, user.event_type_ids);

  const dbUpdateUserResponse = await dataSources.sql.db
    .write('User')
    .where('id', user.id)
    .update(createUserInput(user));

  if (!dbUpdateUserResponse) {
    throw new GraphQLError(`Error while updating User!`);
  }

  const dbUserResponse = await dataSources.sql.users.getById(user.id);

  if (!dbUserResponse) {
    throw new GraphQLError(`Error while fetching User!`);
  }

  return dbUserResponse;
};

export const onboardUserResolver = async (
  _: unknown,
  { user, location }: MutationOnboardUserArgs,
  { dataSources, googleMapsClient }: CustomContext,
): Promise<AuthUser> => {
  if (user.event_type_ids.some((eventTypeId) => !eventTypeId)) {
    throw new GraphQLError('EventTypeId needs to be filled in order to onboard!');
  }

  user.location_id = await dataSources.sql.locations.createLocation(location, googleMapsClient);

  const dbUpdateUserResponse = await dataSources.sql.db
    .write('User')
    .where('id', user.id)
    .update(createUserInput(user));

  if (!dbUpdateUserResponse) {
    throw new GraphQLError(`Error while updating User!`);
  }

  const dbUpdatedUserResponse = await dataSources.sql.users.getById(user.id);

  if (!dbUpdatedUserResponse) {
    throw new GraphQLError(`Error while fetching User!`);
  }

  // Use map to create an array of insert promises
  const insertPromises = user.event_type_ids.map((eventTypeId) =>
    dataSources.sql.db.write('User_EventType').insert({ user_id: user.id, event_type_id: eventTypeId }),
  );

  // Await all insertions
  const dbUserEventTypeResponses = await Promise.all(insertPromises);

  // Check if any of the insertions failed
  if (dbUserEventTypeResponses.some((response) => !response)) {
    throw new GraphQLError(`Error while inserting into User_EventType table!`);
  }

  const dbUserResponse = (await dataSources.sql.users.getById(user.id)) as AuthUser;

  if (!dbUserResponse) {
    throw new GraphQLError(`Error while fetching User!`);
  }

  return dbUserResponse;
};

export const blockUserResolver = async (
  _: unknown,
  { blocker_id, blocked_id }: MutationBlockUserArgs,
  { dataSources }: CustomContext,
): Promise<string> => {
  const user = await dataSources.sql.users.getById(blocked_id);

  if (!user) {
    throw new GraphQLError("User you're trying to block does not exist in DB!");
  }

  const participatedEventIdsWithBlockerAdmin = await dataSources.sql.events.getJointEvents(blocker_id, blocked_id);

  const dbRemoveFromEventsResponse = await dataSources.sql.events.removeFromEvents(
    participatedEventIdsWithBlockerAdmin.map((event) => event.id),
    blocked_id,
  );

  if (!dbRemoveFromEventsResponse) {
    throw new GraphQLError(`Error while attempting to remove user with id: ${blocked_id} from joined events.`);
  }

  for (const event of participatedEventIdsWithBlockerAdmin) {
    try {
      await sendEmail(user.email, 'Event participation declined', {
        text: `Unfortunately, you've been removed from event ${event.name}`,
        html: `Unfortunately, you've been removed from event <a href="https://frontend-team01-vse.handson.pro/event/${event.id}">${event.name}</a>.`,
      });
    } catch (error) {
      throw error;
    }
  }

  const pendingEventsIdsWithBlockerAdmin = await dataSources.sql.events.getPendingEvents(blocker_id, blocked_id);

  await dataSources.sql.events.removeFromPending(
    pendingEventsIdsWithBlockerAdmin.map((event) => event.id),
    blocked_id,
  );

  for (const event of pendingEventsIdsWithBlockerAdmin) {
    try {
      await sendEmail(user.email, 'Event registration declined', {
        text: `Unfortunately, your registration for event ${event.name} has been declined.`,
        html: `Unfortunately, your registration for event <a href="https://frontend-team01-vse.handson.pro/event/${event.id}">${event.name}</a> has been declined.`,
      });
    } catch (error) {
      throw error;
    }
  }

  const adminGroups = await dataSources.sql.groups.getUserAdminGroups(blocker_id);

  await dataSources.sql.groups.removeFromGroups(
    adminGroups.map((group) => group.id),
    blocked_id,
  );

  const dbBlockResponse = await dataSources.sql.db
    .write('Blocked_User')
    .insert({ blocker_id: blocker_id, blocked_id: blocked_id });

  if (!dbBlockResponse) {
    throw new GraphQLError(`Error while attempting to block user with id: ${blocked_id}`);
  }

  return `User with id ${blocked_id} successfully blocked!`;
};

export const unblockUserResolver = async (
  _: unknown,
  { blocker_id, blocked_id }: MutationUnblockUserArgs,
  { dataSources }: CustomContext,
): Promise<string> => {
  const dbBlockResponse = await dataSources.sql.db
    .write('Blocked_User')
    .delete()
    .where({ blocked_id: blocked_id, blocker_id: blocker_id });

  if (!dbBlockResponse) {
    throw new GraphQLError(`Error while attempting to unblock user with id: ${blocked_id}`);
  }

  return `User with id ${blocked_id} successfully unblocked!`;
};
