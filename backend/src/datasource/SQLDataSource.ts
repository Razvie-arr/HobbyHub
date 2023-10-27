/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import { Tables } from 'knex/types/tables';

type TableNames = keyof Tables;

export class SQLDataSource extends BatchedSQLDataSource {
  private createGetAllQuery =
    <T extends TableNames>(tableName: T) =>
    async (offset?: number | null, limit?: number | null) => {
      const result = this.db.query(tableName).offset(offset ?? 0);
      return limit ? result.limit(limit) : result;
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
  public getEventsWithSameTypeExceptCity = (
    eventId: number,
    eventTypeIds: Array<number>,
    city: string,
    offset: number,
    limit: number,
  ) =>
    this.db.query
      .select('Event.*')
      .from('Event')
      .join('Event_EventType', 'Event.id', 'Event_EventType.event_id')
      .join('EventType', 'Event_EventType.event_type_id', 'EventType.id')
      .join('Location', 'Event.location_id', 'Location.id')
      .whereNot('Location.city', city)
      .whereNot('Event.id', eventId)
      .whereIn('EventType.id', eventTypeIds)
      .offset(offset)
      .limit(limit);

  public getEventsWithSameTypeInCity = (
    eventId: number,
    eventTypeIds: Array<number>,
    city: string,
    offset: number,
    limit: number,
  ) =>
    this.db.query
      .select('Event.*')
      .from('Event')
      .join('Event_EventType', 'Event.id', 'Event_EventType.event_id')
      .join('EventType', 'Event_EventType.event_type_id', 'EventType.id')
      .join('Location', 'Event.location_id', 'Location.id')
      .where('Location.city', city)
      .whereNot('Event.id', eventId)
      .whereIn('EventType.id', eventTypeIds)
      .offset(offset)
      .limit(limit);

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

  users = {
    // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
    ...this.createBaseQueries('User'),
    getUserEventTypes: (userId: number) =>
      this.db
        .query('User_EventType')
        .innerJoin('EventType', 'User_EventType.event_type_id', 'EventType.id')
        .where('user_id', userId),
  };
}

