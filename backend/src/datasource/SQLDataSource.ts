/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { BatchedSQLDataSource } from '@nic-jennings/sql-datasource';
import { Tables } from 'knex/types/tables';

import { FilterLocationInput, GroupSortType, SortType } from '../types';

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
      stringQuery += ` DATE(start_datetime) >= "${start_datetime.toString()}" 
      AND DATE(end_datetime) <= "${end_datetime.toString()}"`;
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
    return this.db.query.raw(stringQuery);
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

  public getFilteredGroups = (
    offset: number,
    limit: number,
    eventTypeIds?: Array<number> | null,
    filterLocation?: FilterLocationInput | null,
    sort?: String | null,
  ) => {
    let stringQuery = 'SELECT DISTINCT UserGroup.*';

    let distanceQuery;
    if (filterLocation) {
      distanceQuery = `st_distance_sphere(POINT(loc.latitude, loc.longitude), 
      POINT(${filterLocation.latitude}, ${filterLocation.longitude})) / 1000`;
      stringQuery += `, ${distanceQuery} as distance`;
      stringQuery += ' FROM UserGroup';
      stringQuery += ' JOIN Location loc ON UserGroup.location_id = loc.id';
    } else {
      stringQuery += ' FROM UserGroup';
    }

    if (eventTypeIds) {
      stringQuery += ' JOIN UserGroup_EventType ON UserGroup.id = UserGroup_EventType.group_id';
      stringQuery += ' JOIN EventType ON UserGroup_EventType.event_type_id = EventType.id';
      stringQuery += ` WHERE EventType.id in (${eventTypeIds.toString()})`;
    }

    if (filterLocation) {
      stringQuery += stringQuery.includes('WHERE') ? ' AND' : ' WHERE';
      stringQuery += ` ${distanceQuery} <= ${filterLocation.distance}`;
    }

    if (sort) {
      if (sort === GroupSortType.Distance && filterLocation) {
        stringQuery += ' ORDER BY distance';
      } else if (GroupSortType.Name) {
        stringQuery += ' ORDER BY name ASC';
      }
    }

    stringQuery += ` LIMIT ${limit} OFFSET ${offset} `;
    return this.db.query.raw(stringQuery);
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
    getUserEvents: (userId: number) =>
      this.db
        .query('Event_User')
        .innerJoin('Event', 'Event_User.event_id', 'Event.id')
        .where('Event_User.user_id', userId),
    getUserGroups: (userId: number) =>
      this.db
        .query('User_UserGroup')
        .innerJoin('Group', 'User_UserGroup.group_id', 'UserGroup.id')
        .where('user_id', userId),
  };

  groups = {
    // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
    ...this.createBaseQueries('UserGroup'),
    getGroupEventTypes: (groupId: number) =>
      this.db
        .query('UserGroup_EventType')
        .innerJoin('EventType', 'UserGroup_EventType.event_type_id', 'EventType.id')
        .where('group_id', groupId),
    getGroupMembers: (groupId: number) =>
      this.db.query('User_UserGroup').innerJoin('User', 'User_UserGroup.user_id', 'User.id').where('group_id', groupId),
    getGroupEvents: (groupId: number) =>
      this.db
        .query('Event_UserGroup')
        .innerJoin('Event', 'Event_UserGroup.event_id', 'Event.id')
        .where('Event_UserGroup.group_id', groupId),
  };

  threads = {
    // @ts-ignore, no actual type error but ts-node is erroneously detecting errors
    ...this.createBaseQueries('Thread'),
    getAllByUserId: (userId: number, offset?: number | null, limit?: number | null) => {
      const query = this.db
        .query('User_Thread')
        .innerJoin('Thread', 'User_Thread.thread_id', 'Thread.id')
        .where('user_id', userId)
        .orderBy('last_message_at', 'desc')
        .offset(offset ?? 0);
      return limit ? query.limit(limit) : query;
    },
    getMessages: (threadId: number) => this.db.query('Message').where('thread_id', threadId).orderBy('sent_at', 'desc'),
    getLastMessage: (threadId: number) =>
      this.db.query('Message').where('thread_id', threadId).orderBy('sent_at', 'desc').first('*'),
    getUsers: (threadId: number) =>
      this.db.query('User_Thread').innerJoin('User', 'User_Thread.user_id', 'User.id').where('thread_id', threadId),
    setReadThread: (userId: number, threadId: number, read: boolean) =>
      this.db.write('User_Thread').where('user_id', userId).andWhere('thread_id', threadId).update('thread_read', read),
  };
}
