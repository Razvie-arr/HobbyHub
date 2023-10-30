/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import { Tables } from 'knex/types/tables';

import { FilterLocationInput, SortType } from '../types';

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

  public getFilteredEvents = (
    offset: number,
    limit: number,
    eventTypeIds?: Array<number> | null,
    start_datetime?: String | null,
    end_datetime?: String | null,
    filterLocation?: FilterLocationInput | null,
    sort?: String | null,
  ) => {
    let stringQuery = 'SELECT DISTINCT Event.*';

    let distanceQuery;
    if (filterLocation) {
      distanceQuery = `st_distance_sphere(POINT(loc.latitude, loc.longitude), 
      POINT(${filterLocation.latitude}, ${filterLocation.longitude})) / 1000`;
      stringQuery += `, ${distanceQuery} as distance`;
      stringQuery += ' FROM Event';
      stringQuery += ' JOIN Location loc ON Event.location_id = loc.id';
    } else {
      stringQuery += ' FROM Event';
    }

    if (eventTypeIds) {
      stringQuery += ' JOIN Event_EventType ON Event.id = Event_EventType.event_id';
      stringQuery += ' JOIN EventType ON Event_EventType.event_type_id = EventType.id';
      stringQuery += ` WHERE EventType.id in (${eventTypeIds.toString()})`;
    }

    if (start_datetime && end_datetime) {
      stringQuery += stringQuery.includes('WHERE') ? ' AND' : ' WHERE';
      stringQuery += ` start_datetime >= "${start_datetime.toString()}" 
      AND end_datetime <= "${end_datetime.toString()}"`;
    }

    if (filterLocation) {
      stringQuery += stringQuery.includes('WHERE') ? ' AND' : ' WHERE';
      stringQuery += ` ${distanceQuery} <= ${filterLocation.distance}`;
    }

    if (sort) {
      if (sort === SortType.Distance && filterLocation) {
        stringQuery += ' ORDER BY distance';
      } else if (SortType.Date) {
        stringQuery += ' ORDER BY created_at DESC';
      }
    }

    stringQuery += ` LIMIT ${limit} OFFSET ${offset} `;
    return stringQuery;
  };

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
