import { GraphQLError } from 'graphql/error';

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
  MutationEditUserArgs,
  MutationOnboardUserArgs,
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

  const dbUserResponse = await dataSources.sql.users.getById(user.id);

  if (!dbUserResponse) {
    throw new GraphQLError(`Error while fetching User!`);
  }

  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  return dbUserResponse;
};
