/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import { Tables } from 'knex/types/tables';

import { HAVERSINE_FORMULA } from '../sharedConstants';
import { FilterLocationInput, SortType } from '../types';

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
      .distinct('Event.*')
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
      .distinct('Event.*')
      .from('Event')
      .join('Event_EventType', 'Event.id', 'Event_EventType.event_id')
      .join('EventType', 'Event_EventType.event_type_id', 'EventType.id')
      .join('Location', 'Event.location_id', 'Location.id')
      .where('Location.city', city)
      .whereNot('Event.id', eventId)
      .whereIn('EventType.id', eventTypeIds)
      .offset(offset)
      .limit(limit);

  public executeSearchByEventNameAuthorName = (text: string, offset: number, limit: number) => {
    const textLowerCase = text.toLowerCase();
    return this.db.query
      .select('Event.*')
      .from('Event')
      .join('User', 'Event.author_id', 'User.id')
      .whereRaw('LOWER(Event.name) like ?', `%${textLowerCase}%`)
      .or.whereRaw('LOWER(User.first_name) like ?', `%${textLowerCase}%`)
      .or.whereRaw('LOWER(User.last_name) like ?', `%${textLowerCase}%`)
      .orderBy('start_datetime', 'desc')
      .offset(offset)
      .limit(limit);
  };

  public getFilteredEvents = (
    offset: number,
    limit: number,
    eventTypeIds?: Array<number> | null,
    start_datetime?: String | null,
    end_datetime?: String | null,
    filterLocation?: FilterLocationInput | null,
    sort?: String | null,
  ) => {
    const query = this.db.query.distinct('Event.*').from('Event');
    let distance;

    if (filterLocation) {
      distance = this.db.query.raw(HAVERSINE_FORMULA, [
        filterLocation.latitude,
        filterLocation.longitude,
        filterLocation.latitude,
      ]);
      void query
        .join('Location', 'Event.location_id', '=', 'Location.id')
        .where(distance, '<=', filterLocation.distance);
    }

    if (eventTypeIds) {
      void query
        .join('Event_EventType', 'Event.id', 'Event_EventType.event_id')
        .join('EventType', 'Event_EventType.event_type_id', 'EventType.id')
        .whereIn('EventType.id', eventTypeIds);
    }

    if (start_datetime && end_datetime) {
      void query.whereRaw('DATE(start_datetime) >= ? AND DATE(end_datetime) <= ?', [start_datetime, end_datetime]);
    }

    if (sort) {
      if (sort === SortType.Distance && distance) {
        void query.orderByRaw(distance);
      } else if (SortType.Date) {
        void query.orderBy('created_at', 'DESC');
      }
    }

    return query.offset(offset).limit(limit);
  };

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

