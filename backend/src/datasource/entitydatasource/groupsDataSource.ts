import { DataSourceKnex } from '@nic-jennings/sql-datasource';

import { FilterLocationInput, GroupSortType, User } from '../../types';

export const groupsDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  getGroupEventTypes: (groupId: number) =>
    db
      .query('UserGroup_EventType')
      .innerJoin('EventType', 'UserGroup_EventType.event_type_id', 'EventType.id')
      .where('group_id', groupId),

  getGroupMembers: (groupId: number) =>
    db.query('User_UserGroup').innerJoin('User', 'User_UserGroup.user_id', 'User.id').where('group_id', groupId),

  getGroupEvents: (groupId: number) => db.query('Event').where('group_id', groupId),

  getGroupsByAdminId: (adminId: number) => db.query('UserGroup').where('admin_id', adminId),

  getGroupsWithSameTypeExceptCity: (
    groupId: number,
    eventTypeIds: Array<number>,
    city: string,
    offset: number,
    limit: number,
  ) =>
    db.query
      .distinct('UserGroup.*')
      .from('UserGroup')
      .join('UserGroup_EventType', 'UserGroup.id', 'UserGroup_EventType.group_id')
      .join('EventType', 'UserGroup_EventType.event_type_id', 'EventType.id')
      .join('Location', 'UserGroup.location_id', 'Location.id')
      .whereNot('Location.city', city)
      .whereNot('UserGroup.id', groupId)
      .whereIn('EventType.id', eventTypeIds)
      .offset(offset)
      .limit(limit),

  getGroupsWithSameTypeInCity: (
    groupId: number,
    eventTypeIds: Array<number>,
    city: string,
    offset: number,
    limit: number,
  ) =>
    db.query
      .distinct('UserGroup.*')
      .from('UserGroup')
      .join('UserGroup_EventType', 'UserGroup.id', 'UserGroup_EventType.group_id')
      .join('EventType', 'UserGroup_EventType.event_type_id', 'EventType.id')
      .join('Location', 'UserGroup.location_id', 'Location.id')
      .where('Location.city', city)
      .whereNot('UserGroup.id', groupId)
      .whereIn('EventType.id', eventTypeIds)
      .offset(offset)
      .limit(limit),

  getFilteredGroups: (
    offset: number,
    limit: number,
    eventTypeIds?: Array<number> | null,
    filterLocation?: FilterLocationInput | null,
    sort?: String | null,
  ) => {
    let stringQuery = 'SELECT DISTINCT UserGroup.*';

    let distanceQuery;
    if (filterLocation) {
      distanceQuery = `st_distance_sphere(POINT(loc.latitude, loc.longitude), 
      POINT(${filterLocation.latitude}, ${filterLocation.longitude})) / 1000`;
      stringQuery += `, ${distanceQuery} as distance`;
      stringQuery += ' FROM UserGroup';
      stringQuery += ' JOIN Location loc ON UserGroup.location_id = loc.id';
    } else {
      stringQuery += ' FROM UserGroup';
    }

    if (eventTypeIds) {
      stringQuery += ' JOIN UserGroup_EventType ON UserGroup.id = UserGroup_EventType.group_id';
      stringQuery += ' JOIN EventType ON UserGroup_EventType.event_type_id = EventType.id';
      stringQuery += ` WHERE EventType.id in (${eventTypeIds.toString()})`;
    }

    if (filterLocation) {
      stringQuery += stringQuery.includes('WHERE') ? ' AND' : ' WHERE';
      stringQuery += ` ${distanceQuery} <= ${filterLocation.distance}`;
    }

    if (sort) {
      if (sort === GroupSortType.Distance && filterLocation) {
        stringQuery += ' ORDER BY distance';
      } else if (GroupSortType.Name) {
        stringQuery += ' ORDER BY name ASC';
      }
    }

    stringQuery += ` LIMIT ${limit} OFFSET ${offset} `;
    return db.query.raw(stringQuery);
  },

  getUserAdminGroups: (userId: number, offset?: number | null, limit?: number | null) => {
    const query = db
      .query('UserGroup')
      .where('admin_id', userId)
      .offset(offset ?? 0);
    return limit ? query.limit(limit) : query;
  },

  getGroupAdmin: async (group_id: number): Promise<User> =>
    (await db
      .query('User.*')
      .from('User')
      .join('UserGroup', 'User.id', 'UserGroup.admin_id')
      .where('UserGroup.id', group_id)
      .first('*')) ?? null,
});
