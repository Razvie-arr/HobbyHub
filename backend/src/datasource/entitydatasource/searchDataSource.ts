import { DataSourceKnex } from '@nic-jennings/sql-datasource';

import { usersDataSource } from './usersDataSource';

export const searchDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  executeSearchByEventNameAuthorNameGroupName: async (
    text: string,
    offset: number,
    limit: number,
    user_id?: number | null,
  ) => {
    const textLowerCase = text.toLowerCase();
    const blockerIds = user_id ? await usersDataSource(db).getBlockersIds(user_id) : null;
    console.log(blockerIds);
    let result;

    if (blockerIds && blockerIds.length > 0) {
      result = db.query
        .select('Event.*')
        .from('Event')
        .leftJoin('User', 'Event.author_id', 'User.id')
        .leftJoin('UserGroup', 'Event.group_id', 'UserGroup.id')
        .whereNotIn('Event.author_id', blockerIds)
        .whereRaw('LOWER(Event.name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(User.first_name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(User.last_name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(UserGroup.name) like ?', `%${textLowerCase}%`)
        .orderBy('start_datetime', 'desc')
        .offset(offset)
        .limit(limit);
    } else {
      result = db.query
        .select('Event.*')
        .from('Event')
        .leftJoin('User', 'Event.author_id', 'User.id')
        .leftJoin('UserGroup', 'Event.group_id', 'UserGroup.id')
        .whereRaw('LOWER(Event.name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(User.first_name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(User.last_name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(UserGroup.name) like ?', `%${textLowerCase}%`)
        .orderBy('start_datetime', 'desc')
        .offset(offset)
        .limit(limit);
    }

    return result;
  },
  executeSearchByGroupNameAdminName: async (text: string, offset: number, limit: number, user_id?: number | null) => {
    const textLowerCase = text.toLowerCase();
    const blockerIds = user_id ? await usersDataSource(db).getBlockersIds(user_id) : null;
    let result;

    if (blockerIds && blockerIds.length > 0) {
      result = db.query
        .select('UserGroup.*')
        .from('UserGroup')
        .join('User', 'UserGroup.admin_id', 'User.id')
        .whereNotIn('UserGroup.admin_id', blockerIds)
        .whereRaw('LOWER(UserGroup.name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(User.first_name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(User.last_name) like ?', `%${textLowerCase}%`)
        .offset(offset)
        .limit(limit);
    } else {
      result = db.query
        .select('UserGroup.*')
        .from('UserGroup')
        .join('User', 'UserGroup.admin_id', 'User.id')
        .whereRaw('LOWER(UserGroup.name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(User.first_name) like ?', `%${textLowerCase}%`)
        .or.whereRaw('LOWER(User.last_name) like ?', `%${textLowerCase}%`)
        .offset(offset)
        .limit(limit);
    }
    return result;
  },
});
