import { Knex } from 'knex';

import { Event, EventType, Location, User } from '../types/graphqlTypesGenerated';

declare module 'knex/types/tables' {
  interface Tables {
    Event: Event;
    EventType: EventType;
    Location: Location;
    User: User;

    Event_EventType: { event_id: number; event_type_id: number };
    Event_User: { event_id: number; user_id: number };
    User_Location: { user_id: number; location_id: number };
    User_EventType: { user_id: number; event_type_id: number };

    //https://knexjs.org/guide/#typescript
    event_composite: Knex.CompositeTableType<
      Event,
      Partial<Omit<Event, 'id' | 'created_at'>> &
        Pick<
          Event,
          'name' | 'summary' | 'capacity' | 'allow_waitlist' | 'start_datetime' | 'end_datetime' | 'location'
        > &
        Partial<Pick<Event, 'description' | 'image_filePath' | 'author_id' | 'group_id'>>,
      Partial<Omit<Event, 'id' | 'created_at' | 'author_id' | 'group_id'>>
    >;

    location_composite: Knex.CompositeTableType<
      Location,
      Partial<Omit<Location, 'id'>> &
        Pick<Location, 'longitude' | 'latitude' | 'city' | 'street_number' | 'street_name' | 'country'> &
        Partial<Pick<Location, 'additional_information'>>,
      Partial<Omit<Location, 'id'>>
    >;
  }
}

