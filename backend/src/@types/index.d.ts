import { Knex } from 'knex';

import { Event, EventType, Group, Location, Review, Thread, User } from '../types';

declare module 'knex/types/tables' {
  interface Tables {
    Event: Event;
    EventType: EventType;
    Location: Location;
    User: User;
    Thread: Thread;
    Message: Message;
    UserGroup: Group;
    Review: Review;

    Event_EventType: { event_id: number; event_type_id: number };
    Event_User: { event_id: number; user_id: number };
    Event_UserGroup: { event_id: number; group_id: number };
    Event_UserRequest: { event_id: number; user_id: number; text: string };
    UserGroup_EventType: { group_id: number; event_type_id: number };
    User_EventType: { user_id: number; event_type_id: number };
    User_Thread: { user_id: number; thread_id: number; thread_read: boolean };
    User_UserGroup: { user_id: number; group_id: number };

    //https://knexjs.org/guide/#typescript
    event_composite: Knex.CompositeTableType<
      Event,
      Partial<Omit<Event, 'id' | 'created_at'>> &
        Pick<
          Event,
          'name' | 'summary' | 'capacity' | 'allow_waitlist' | 'start_datetime' | 'end_datetime' | 'location'
        > &
        Partial<Pick<Event, 'description' | 'image_filepath' | 'author_id' | 'group_id'>>,
      Partial<Omit<Event, 'id' | 'created_at' | 'author_id' | 'group_id'>>
    >;

    location_composite: Knex.CompositeTableType<
      Location,
      Partial<Omit<Location, 'id'>> &
        Pick<Location, 'longitude' | 'latitude' | 'city' | 'street_number' | 'street_name' | 'country'>,
      Partial<Omit<Location, 'id'>>
    >;

    user_composite: Knex.CompositeTableType<
      User,
      Partial<Omit<User, 'id'>> &
        Pick<User, 'email' | 'first_name' | 'last_name' | 'verified'> &
        Partial<Pick<User, 'location_id' | 'description'>>,
      Partial<Omit<User, 'id'>>
    >;

    group_composite: Knex.CompositeTableType<
      Group,
      Partial<Omit<Group, 'id'>> &
        Pick<Group, 'name' | 'summary' | 'admin_id' | 'location'> &
        Partial<Pick<Group, 'description' | 'image_filepath'>>,
      Partial<Omit<Group, 'id' | 'admin_id'>>
    >;
  }
}
