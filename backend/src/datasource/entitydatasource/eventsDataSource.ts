import { DataSourceKnex } from '@nic-jennings/sql-datasource';

import { FilterLocationInput, SortType } from '../../types';

export const eventsDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  getEventEventTypes: (eventId: number) =>
    db
      .query('Event_EventType')
      .innerJoin('EventType', 'Event_EventType.event_type_id', 'EventType.id')
      .where('event_id', eventId),

  getEventParticipants: (eventId: number) =>
    db.query('Event_User').innerJoin('User', 'Event_User.user_id', 'User.id').where('event_id', eventId),

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
});
