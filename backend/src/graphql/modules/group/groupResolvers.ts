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
  QueryFilterGroupsArgs,
  QueryGroupByIdArgs,
  QueryGroupsArgs,
  QueryGroupsByIdsArgs,
  QueryInterestingNearbyGroupsArgs,
  QueryNearbyGroupsArgs,
  User,
} from '../../../types';

const DEFAULT_LIMIT = 4;

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
  const groups = await dataSources.sql.getFilteredGroups(
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

