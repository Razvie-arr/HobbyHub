import fs from 'fs';
import fsPromises from 'fs/promises';
import { GraphQLError } from 'graphql/error';

import { HAVERSINE_FORMULA } from '../../../sharedConstants';
import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Event,
  EventType,
  Group,
  Location,
  MutationCreateGroupArgs,
  MutationDeleteGroupArgs,
  MutationEditGroupArgs,
  MutationUploadGroupImageArgs,
  QueryFilterGroupsArgs,
  QueryGroupByIdArgs,
  QueryGroupsArgs,
  QueryGroupsByIdsArgs,
  QueryInterestingNearbyGroupsArgs,
  QueryNearbyGroupsArgs,
  QuerySimilarGroupsArgs,
  User,
} from '../../../types';
import { createGroupInput, getPublicStorageFilePath } from '../../../utils/helpers';
import { createLocation, updateLocation } from '../location/locationResolvers';

const DEFAULT_LIMIT = 4;
const FRONTEND_PROFILE_IMAGE_RELATIVE_PATH = 'uploads/group_image';
const MINIMUM_COUNT_SIMILAR_GROUPS = 3;

export const groupsResolver: ContextualResolver<Array<Group>, QueryGroupsArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.groups.getAll(offset, limit);

export const groupByIdResolver: ContextualNullableResolver<Group, QueryGroupByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.groups.getById(id);

export const groupsByIdsResolver: ContextualResolver<Array<Group>, QueryGroupsByIdsArgs> = async (
  _,
  { ids },
  { dataSources },
) => await dataSources.sql.groups.getByIds(ids);

export const groupAdminResolver: ContextualResolverWithParent<User, Group> = async (parent, _, { dataSources }) =>
  parent.admin_id
    ? ((await dataSources.sql.users.getById(parent.admin_id)) as unknown as User)
    : (null as unknown as User);

export const groupEventTypesResolver: ContextualResolverWithParent<Array<EventType>, Group> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.groups.getGroupEventTypes(parent.id);

export const groupLocationResolver: ContextualResolverWithParent<Location, Group> = async (
  parent,
  _,
  { dataSources },
) =>
  parent.location_id
    ? ((await dataSources.sql.locations.getById(parent.location_id)) as unknown as Location)
    : (null as unknown as Location);

export const groupEventsResolver: ContextualResolverWithParent<Array<Event>, Group> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.groups.getGroupEvents(parent.id);

export const groupMembersResolver: ContextualResolverWithParent<Array<User>, Group> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.groups.getGroupMembers(parent.id);

export const filterGroupsResolver = async (
  _: unknown,
  { offset, limit, eventTypeIds, filterLocation, sort }: QueryFilterGroupsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Group>> => {
  offset = offset ?? 0;
  limit = limit ?? DEFAULT_LIMIT;
  const groups = await dataSources.sql.groups.getFilteredGroups(
    offset,
    limit,
    eventTypeIds,
    filterLocation,
    sort ? sort.toString() : null,
  );
  return groups[0];
};

const DEFAULT_DISTANCE = 20;

const locationAwareGroupAttributes = [
  'UserGroup.id as id',
  'name',
  'summary',
  'description',
  'admin_id',
  'image_filepath',
  'location_id',
  'country',
  'city',
  'street_name',
  'street_number',
  'latitude',
  'longitude',
];

export const nearbyGroupsResolver = async (
  _: unknown,
  { longitude, latitude, offset, limit }: QueryNearbyGroupsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Group>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const result = dataSources.sql.db.query
    .select(...locationAwareGroupAttributes)
    .from('UserGroup')
    .join('Location', 'UserGroup.location_id', '=', 'Location.id')
    .having(distance, '<', DEFAULT_DISTANCE)
    .orderByRaw(distance)
    .offset(offset ?? 0);
  return limit ? result.limit(limit) : result.limit(DEFAULT_LIMIT);
};

export const interestingNearbyGroupsResolver = async (
  _: unknown,
  { latitude, longitude, userId, offset, limit }: QueryInterestingNearbyGroupsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Group>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const result = dataSources.sql.db.query
    .distinct(...locationAwareGroupAttributes)
    .from('UserGroup')
    .join('UserGroup_EventType', 'UserGroup.id', 'UserGroup_EventType.group_id')
    .join('User_EventType', 'UserGroup_EventType.event_type_id', 'User_EventType.event_type_id')
    .join('Location', 'UserGroup.location_id', '=', 'Location.id')
    .where('User_EventType.user_id', '=', userId)
    .having(distance, '<', DEFAULT_DISTANCE)
    .offset(offset ?? 0);
  return limit ? result.limit(limit) : result.limit(DEFAULT_LIMIT);
};

export const similarGroupsResolver = async (
  _: unknown,
  { groupId, city, eventTypeIds, offset, limit }: QuerySimilarGroupsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Group>> => {
  offset = offset ?? 0;
  limit = limit ?? DEFAULT_LIMIT;

  const similarGroupsWithinSameCity: Array<Group> = await dataSources.sql.groups.getGroupsWithSameTypeInCity(
    groupId,
    eventTypeIds,
    city,
    offset,
    limit,
  );

  const similarGroupsCount = similarGroupsWithinSameCity.length;

  if (similarGroupsCount < MINIMUM_COUNT_SIMILAR_GROUPS) {
    const similarGroupsOutsideCity: Array<Group> = await dataSources.sql.groups.getGroupsWithSameTypeExceptCity(
      groupId,
      eventTypeIds,
      city,
      0,
      limit - similarGroupsCount,
    );
    return [...similarGroupsWithinSameCity, ...similarGroupsOutsideCity];
  }

  return similarGroupsWithinSameCity;
};

export const uploadGroupImageResolver = async (_: unknown, { group_image }: MutationUploadGroupImageArgs) => {
  let groupImageUrl = null;
  const groupImageFile = await group_image;

  if (groupImageFile) {
    const { fileDirectoryPath, filePath, relativeFileUrl } = getPublicStorageFilePath({
      filename: groupImageFile.filename,
      relativeDirectory: FRONTEND_PROFILE_IMAGE_RELATIVE_PATH,
    });

    await fsPromises.mkdir(fileDirectoryPath, { recursive: true });

    const stream = groupImageFile.createReadStream();
    stream.pipe(fs.createWriteStream(filePath));

    groupImageUrl = relativeFileUrl;
  }

  return groupImageUrl;
};

export const createGroupResolver = async (
  _: unknown,
  { location, group }: MutationCreateGroupArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  group.location_id = await createLocation(location, dataSources, googleMapsClient);

  const dbResponse = await dataSources.sql.db.write('UserGroup').insert(createGroupInput(group));
  if (!dbResponse[0]) {
    throw new GraphQLError(`Error while creating group!`);
  }

  const dbResult = await dataSources.sql.groups.getById(dbResponse[0]);

  if (!dbResult) {
    throw new GraphQLError(`Error while querying just created group - it should exist but doesn't!`);
  }

  const group_id = dbResponse[0];
  // Use map to create an array of insert promises
  const insertPromises = group.event_type_ids.map((eventTypeId) =>
    dataSources.sql.db.write('UserGroup_EventType').insert({ group_id: group_id, event_type_id: eventTypeId }),
  );

  // Await all insertions
  const dbGroupEventTypeResponses = await Promise.all(insertPromises);

  // Check if any of the insertions failed
  if (dbGroupEventTypeResponses.some((response) => !response)) {
    throw new GraphQLError(`Error while inserting into UserGroup_EventType table!`);
  }

  return dbResult;
};

export const editGroupResolver = async (
  _: unknown,
  { location, group }: MutationEditGroupArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  if (!group.id) {
    throw new GraphQLError('Group ID needs to be filled in order to update!');
  }
  if (!location.id && !group.location_id) {
    throw new GraphQLError('Location ID needs to be filled in order to update!');
  }
  if (group.event_type_ids.some((eventTypeId) => !eventTypeId)) {
    throw new GraphQLError('EventTypeId needs to be filled in order to update!');
  }

  location.id = location.id ? location.id : group.location_id;
  await updateLocation(location, dataSources, googleMapsClient);

  const group_id = group.id;
  const dbDeleteGroupEventTypeResponse = await dataSources.sql.db
    .write('UserGroup_EventType')
    .where('group_id', group_id)
    .delete();

  if (!dbDeleteGroupEventTypeResponse) {
    throw new GraphQLError(`Error while updating UserGroup_EventType table part 1!`);
  }
  // Use map to create an array of insert promises
  const insertPromises = group.event_type_ids.map((eventTypeId) =>
    dataSources.sql.db
      .write('UserGroup_EventType')
      .where('group_id', group_id)
      .insert({ group_id: group_id, event_type_id: eventTypeId }),
  );

  // Await all insertions
  const dbGroupEventTypeResponses = await Promise.all(insertPromises);

  // Check if any of the insertions failed
  if (dbGroupEventTypeResponses.some((response) => !response)) {
    throw new GraphQLError(`Error while updating UserGroup_EventType table part 2!`);
  }

  const dbResponse = await dataSources.sql.db
    .write('UserGroup')
    .where('id', '=', group.id)
    .update(createGroupInput(group));

  if (!dbResponse) {
    throw new GraphQLError(`Error while updating group!`);
  }

  const dbResult = await dataSources.sql.groups.getById(group.id);

  if (!dbResult) {
    throw new GraphQLError(`Error while querying group!`);
  }

  return dbResult;
};

export const deleteGroupResolver = async (
  _: unknown,
  { group_id, location_id }: MutationDeleteGroupArgs,
  { dataSources }: CustomContext,
) => {
  const dbGroupEventTypeResult = await dataSources.sql.db
    .write('UserGroup_EventType')
    .where('group_id', group_id)
    .delete();

  if (!dbGroupEventTypeResult) {
    throw new GraphQLError(`Error while deleting group from UserGroup_EventType table!`);
  }

  const dbGroupResult = await dataSources.sql.db.write('UserGroup').where('id', group_id).delete();

  if (!dbGroupResult) {
    throw new GraphQLError(`Error while deleting group!`);
  }

  const dbLocationResult = await dataSources.sql.db.write('Location').where('id', location_id).delete();

  if (!dbLocationResult) {
    throw new GraphQLError(`Error while deleting location!`);
  }
  return 'Group and location deleted!';
};
