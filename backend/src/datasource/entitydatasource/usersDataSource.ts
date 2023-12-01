import { DataSourceKnex } from '@nic-jennings/sql-datasource';

import { AuthUser } from '../../types';

export const usersDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  getUserEventTypes: (userId: number) =>
    db
      .query('User_EventType')
      .innerJoin('EventType', 'User_EventType.event_type_id', 'EventType.id')
      .where('user_id', userId),

  getUserEvents: (userId: number) =>
    db.query('Event_User').innerJoin('Event', 'Event_User.event_id', 'Event.id').where('Event_User.user_id', userId),

  getUserGroups: (userId: number) =>
    db.query('User_UserGroup').innerJoin('Group', 'User_UserGroup.group_id', 'UserGroup.id').where('user_id', userId),

  getAuthById: (id: number) => (db.query('User').where('id', id).first('*') as unknown as AuthUser) ?? null,
});
