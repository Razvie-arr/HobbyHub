/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import { Tables } from 'knex/types/tables';

import { eventTypeDataSource } from './entitydatasource/eventTypeDataSource';
import { locationsDataSource } from './entitydatasource/locationsDataSource';
import {
  eventsDataSource,
  groupsDataSource,
  messagesDataSource,
  threadsDataSource,
  usersDataSource,
} from './entitydatasource';

type TableNames = keyof Tables;

export class SQLDataSource extends BatchedSQLDataSource {
  private createGetAllQuery =
    <T extends TableNames>(tableName: T) =>
    async (offset?: number | null, limit?: number | null, orderBy?: { value: string; order: 'desc' | 'asc' }) => {
      const query = this.db.query(tableName);
      const sortedResult = orderBy ? query.orderBy(orderBy.value, orderBy.order) : query;
      const offsetResult = sortedResult.offset(offset ?? 0);
      return limit ? offsetResult.limit(limit) : offsetResult;
    };

  private createGetByIdQuery =
    <T extends TableNames>(tableName: T) =>
    async (id: number) =>
      (await this.db.query(tableName).where('id', id).first('*')) ?? null;

  private createGetByIdsQuery =
    <T extends TableNames>(tableName: T) =>
    async (ids: number[]) =>
      await this.db.query(tableName).whereIn('id', ids);

  private createBaseQueries = <T extends TableNames>(tableName: T) => ({
    getAll: this.createGetAllQuery(tableName),
    getById: this.createGetByIdQuery(tableName),
    getByIds: this.createGetByIdsQuery(tableName),
  });

  public executeSearchByEventNameAuthorNameGroupName = (text: string, offset: number, limit: number) => {
    const textLowerCase = text.toLowerCase();
    return this.db.query
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
  };

  public executeSearchByGroupNameAdminName = (text: string, offset: number, limit: number) => {
    const textLowerCase = text.toLowerCase();
    return this.db.query
      .select('UserGroup.*')
      .from('UserGroup')
      .join('User', 'UserGroup.admin_id', 'User.id')
      .whereRaw('LOWER(UserGroup.name) like ?', `%${textLowerCase}%`)
      .or.whereRaw('LOWER(User.first_name) like ?', `%${textLowerCase}%`)
      .or.whereRaw('LOWER(User.last_name) like ?', `%${textLowerCase}%`)
      .offset(offset)
      .limit(limit);
  };

  events = {
    // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
    ...this.createBaseQueries('Event'),
    ...eventsDataSource(this.db),
  };

  // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
  eventTypes = {
    ...this.createBaseQueries('EventType'),
    ...eventTypeDataSource(this.db),
  };
  // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
  locations = {
    ...this.createBaseQueries('Location'),
    ...locationsDataSource(this.db),
  };

  users = {
    // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
    ...this.createBaseQueries('User'),
    ...usersDataSource(this.db),
  };

  groups = {
    // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
    ...this.createBaseQueries('UserGroup'),
    ...groupsDataSource(this.db),
  };

  threads = {
    // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
    ...this.createBaseQueries('Thread'),
    ...threadsDataSource(this.db),
  };

  messages = {
    ...messagesDataSource(this.db),
  };
}
