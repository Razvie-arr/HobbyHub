import { Event, EventType, Group, Location, Message, Review, Thread, User } from './graphqlTypesGenerated';

export interface Tables {
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
}

