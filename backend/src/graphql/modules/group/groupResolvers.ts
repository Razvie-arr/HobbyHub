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
