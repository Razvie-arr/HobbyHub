import { DataSourceKnex } from '@nic-jennings/sql-datasource';

export const searchDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  executeSearchByEventNameAuthorNameGroupName: (text: string, offset: number, limit: number) => {
    const textLowerCase = text.toLowerCase();
    return db.query
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
  },
  executeSearchByGroupNameAdminName: (text: string, offset: number, limit: number) => {
    const textLowerCase = text.toLowerCase();
    return db.query
      .select('UserGroup.*')
      .from('UserGroup')
      .join('User', 'UserGroup.admin_id', 'User.id')
      .whereRaw('LOWER(UserGroup.name) like ?', `%${textLowerCase}%`)
      .or.whereRaw('LOWER(User.first_name) like ?', `%${textLowerCase}%`)
      .or.whereRaw('LOWER(User.last_name) like ?', `%${textLowerCase}%`)
      .offset(offset)
      .limit(limit);
  },
});

