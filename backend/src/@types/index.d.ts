import { Knex } from 'knex';

import { Event, Group, Location, Tables as OwnTables, User } from '../types';

declare module 'knex/types/tables' {
  interface Tables extends OwnTables {
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

