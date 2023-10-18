import { Event, EventType, User } from '../types/graphqlTypesGenerated';

declare module 'knex/types/tables' {
  interface Tables {
    Event: Event;
    EventType: EventType;
    Location: Location;
    User: User;

    Event_EventType: { event_id: number; event_type_id: number };
    Event_User: { event_id: number; user_id: number };
    User_EventType: { user_id: number; event_type_id: number };
  }
}

