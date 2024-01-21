import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';

import { Tables } from '../types';

import { eventTypeDataSource } from './entitydatasource/eventTypeDataSource';
import { locationsDataSource } from './entitydatasource/locationsDataSource';
import {
  eventsDataSource,
  groupsDataSource,
  messagesDataSource,
  reviewDataSource,
  searchDataSource,
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

  search = searchDataSource(this.db);

  events = {
    ...this.createBaseQueries('Event'),
    ...eventsDataSource(this.db),
  };

  eventTypes = {
    ...this.createBaseQueries('EventType'),
    ...eventTypeDataSource(this.db),
  };

  locations = {
    ...this.createBaseQueries('Location'),
    ...locationsDataSource(this.db),
  };

  users = {
    ...this.createBaseQueries('User'),
    ...usersDataSource(this.db),
  };

  groups = {
    ...this.createBaseQueries('UserGroup'),
    ...groupsDataSource(this.db),
  };

  threads = {
    ...this.createBaseQueries('Thread'),
    ...threadsDataSource(this.db),
  };

  messages = {
    ...messagesDataSource(this.db),
  };

  reviews = {
    ...this.createBaseQueries('Review'),
    ...reviewDataSource(this.db),
  };
}

