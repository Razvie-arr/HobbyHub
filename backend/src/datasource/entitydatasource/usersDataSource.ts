import { DataSourceKnex } from '@nic-jennings/sql-datasource';

import { AuthUser, User } from '../../types';

export const usersDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  getUserEventTypes: (userId: number) =>
    db
      .query('User_EventType')
      .innerJoin('EventType', 'User_EventType.event_type_id', 'EventType.id')
      .where('user_id', userId),

  getUserEvents: (userId: number) =>
    db.query('Event_User').innerJoin('Event', 'Event_User.event_id', 'Event.id').where('Event_User.user_id', userId),

  getUserGroups: (userId: number) =>
    db
      .query('User_UserGroup')
      .innerJoin('UserGroup', 'User_UserGroup.group_id', 'UserGroup.id')
      .where('user_id', userId),

  getAuthById: (id: number) => (db.query('User').where('id', id).first('*') as unknown as AuthUser) ?? null,

  getUserBlocking: (id: number) =>
    db
      .query('Blocked_User')
      .innerJoin('User', 'Blocked_User.blocked_id', 'User.id')
      .where('Blocked_User.blocker_id', id),

  getUserBlockedBy: (id: number) =>
    db
      .query('Blocked_User')
      .innerJoin('User', 'Blocked_User.blocker_id', 'User.id')
      .where('Blocked_User.blocked_id', id),

  //Returns IDs of User both blocked by and blocking originator
  getBlockersIds: async (id: number) => {
    const blocking = await db
      .query('Blocked_User')
      .innerJoin('User', 'Blocked_User.blocked_id', 'User.id')
      .where('Blocked_User.blocker_id', id);

    const blockedBy = await db
      .query('Blocked_User')
      .innerJoin('User', 'Blocked_User.blocker_id', 'User.id')
      .where('Blocked_User.blocked_id', id);

    return [...blockedBy.map((user) => user.id), ...blocking.map((user) => user.id)];
  },

  updateUserToken: (email: String, resetToken: String) =>
    db.write.raw('UPDATE User SET token = ? WHERE email = ?', [resetToken, email]),

  getUserByToken: async (token: String) =>
    (await db.query.raw(`SELECT * FROM User WHERE token = ?`, [token]))[0][0] as unknown as User,

  updatePassword: (passwordHash: String, user: User) =>
    db.write.raw('UPDATE User SET password = ? WHERE id = ?', [passwordHash, user.id]),
});
