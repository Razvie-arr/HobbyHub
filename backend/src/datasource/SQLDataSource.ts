/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import { Tables } from 'knex/types/tables';

type TableNames = keyof Tables;

export class SQLDataSource extends BatchedSQLDataSource {
  private createGetAllQuery =
    <T extends TableNames>(tableName: T) =>
    async () =>
      await this.db.query(tableName);

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

  events = {
    // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
    ...this.createBaseQueries('Event'),
    getEventEventTypes: (eventId: number) =>
      this.db
        .query('Event_EventType')
        .innerJoin('EventType', 'Event_EventType.event_type_id', 'EventType.id')
        .where('event_id', eventId),
    getEventParticipants: (eventId: number) =>
      this.db.query('Event_User').innerJoin('User', 'Event_User.user_id', 'User.id').where('event_id', eventId),
  };

  // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
  eventTypes = this.createBaseQueries('EventType');
  // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
  locations = this.createBaseQueries('Location');
  // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
  users = this.createBaseQueries('User');
}

