import { DataSourceKnex } from '@nic-jennings/sql-datasource';
import { Knex } from 'knex';

import { DEFAULT_DISTANCE, DEFAULT_LIMIT } from '../../sharedConstants';
import { FilterLocationInput, SortType } from '../../types';

const locationAwareEventAttributes = [
  'Event.id as id',
  'name',
  'summary',
  'description',
  'author_id',
  'group_id',
  'capacity',
  'allow_waitlist',
  'image_filepath',
  'start_datetime',
  'end_datetime',
  'location_id',
  'created_at',
  'country',
  'city',
  'street_name',
  'street_number',
  'latitude',
  'longitude',
];

export const eventsDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  getEventEventTypes: (eventId: number) =>
    db
      .query('Event_EventType')
      .innerJoin('EventType', 'Event_EventType.event_type_id', 'EventType.id')
      .where('event_id', eventId),

  getAcceptedEventParticipants: (eventId: number) =>
    db.query('Event_User').innerJoin('User', 'Event_User.user_id', 'User.id').where('event_id', eventId),

  getPendingEventParticipants: (eventId: number) =>
    db.query('Event_UserRequest').innerJoin('User', 'Event_UserRequest.user_id', 'User.id').where('event_id', eventId),

  getPendingEventText: (eventId: number) =>
    db.query('Event_UserRequest').innerJoin('User', 'Event_UserRequest.user_id', 'User.id').where('event_id', eventId),

  getFilteredEvents: (
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
      } else if (sort === SortType.DateCreated) {
        stringQuery += ' ORDER BY created_at DESC';
      } else if (sort === SortType.DateStart) {
        stringQuery += ' ORDER BY start_datetime DESC';
      }
    }

    stringQuery += ` LIMIT ${limit} OFFSET ${offset} `;
    return db.query.raw(stringQuery);
  },

  getEventsWithSameTypeExceptCity: (
    eventId: number,
    eventTypeIds: Array<number>,
    city: string,
    offset: number,
    limit: number,
  ) =>
    db.query
      .distinct('Event.*')
      .from('Event')
      .join('Event_EventType', 'Event.id', 'Event_EventType.event_id')
      .join('EventType', 'Event_EventType.event_type_id', 'EventType.id')
      .join('Location', 'Event.location_id', 'Location.id')
      .whereNot('Location.city', city)
      .whereNot('Event.id', eventId)
      .whereIn('EventType.id', eventTypeIds)
      .offset(offset)
      .limit(limit),

  getEventsWithSameTypeInCity: (
    eventId: number,
    eventTypeIds: Array<number>,
    city: string,
    offset: number,
    limit: number,
  ) =>
    db.query
      .distinct('Event.*')
      .from('Event')
      .join('Event_EventType', 'Event.id', 'Event_EventType.event_id')
      .join('EventType', 'Event_EventType.event_type_id', 'EventType.id')
      .join('Location', 'Event.location_id', 'Location.id')
      .where('Location.city', city)
      .whereNot('Event.id', eventId)
      .whereIn('EventType.id', eventTypeIds)
      .offset(offset)
      .limit(limit),

  getNewlyCreatedNearbyEvents: (distance: Knex.Raw, offset?: number | null, limit?: number | null) => {
    const result = db.query
      .select(...locationAwareEventAttributes)
      .from('Event')
      .join('Location', 'Event.location_id', '=', 'Location.id')
      .having(distance, '<', DEFAULT_DISTANCE)
      .orderBy('created_at', 'desc')
      .offset(offset ?? 0);
    return limit ? result.limit(limit) : result;
  },

  getTodaysNearbyEvents: (
    distance: Knex.Raw,
    todaysDate: string | undefined,
    offset?: number | null,
    limit?: number | null,
  ) => {
    const result = db.query
      .select(...locationAwareEventAttributes)
      .from('Event')
      .join('Location', 'Event.location_id', '=', 'Location.id')
      .having(distance, '<', DEFAULT_DISTANCE)
      .whereRaw('DATE(start_datetime) = ?', [todaysDate])
      .orderByRaw(distance)
      .offset(offset ?? 0);
    return limit ? result.limit(limit) : result.limit(DEFAULT_LIMIT);
  },

  getWeeklyNearbyEvents: (
    distance: Knex.Raw,
    todaysDate: string | undefined,
    nextWeekDate: string | undefined,
    offset?: number | null,
    limit?: number | null,
  ) => {
    const result = db.query
      .select(...locationAwareEventAttributes)
      .from('Event')
      .join('Location', 'Event.location_id', '=', 'Location.id')
      .having(distance, '<', DEFAULT_DISTANCE)
      .whereRaw('DATE(start_datetime) BETWEEN ? AND ?', [todaysDate, nextWeekDate])
      .orderByRaw(distance)
      .offset(offset ?? 0);
    return limit ? result.limit(limit) : result.limit(DEFAULT_LIMIT);
  },

  getInterestingNearbyEvents: (distance: Knex.Raw, userId: number, offset?: number | null, limit?: number | null) => {
    const result = db.query
      .distinct(...locationAwareEventAttributes)
      .from('Event')
      .join('Event_EventType', 'Event.id', 'Event_EventType.event_id')
      .join('User_EventType', 'Event_EventType.event_type_id', 'User_EventType.event_type_id')
      .join('Location', 'Event.location_id', '=', 'Location.id')
      .where('User_EventType.user_id', '=', userId)
      .having(distance, '<', DEFAULT_DISTANCE)
      .offset(offset ?? 0);
    return limit ? result.limit(limit) : result.limit(DEFAULT_LIMIT);
  },

  getUserCreatedEvents: (userId: number, offset?: number | null, limit?: number | null) => {
    const query = db
      .query('Event')
      .where('author_id', userId)
      .offset(offset ?? 0);
    return limit ? query.limit(limit) : query;
  },

  getEventsForFeedback: () =>
    db.query('Event').whereRaw('CURRENT_TIMESTAMP > end_datetime').andWhere('feedback_request_sent', 0),

  setFeedbackSentStatus: (eventId: number, sent: boolean) =>
    db.write('Event').where('id', eventId).update({ feedback_request_sent: sent }),

  setNullReviewsEventId: (eventId: number) => db.write('Review').where('event_id', eventId).update({ event_id: null }),

  setCancelled: (eventId: number, cancelled: boolean) =>
    db.write('Event').where('id', eventId).update({ cancelled: cancelled }),
});
