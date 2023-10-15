import { Event, Location, User } from 'src/gql/graphql';

export type EventProps = Omit<Event, 'author' | 'location'> & { author: Omit<User, 'email' | 'id' | 'password'> } & {
  location: Omit<Location, 'id'>;
};

export interface WithEvent {
  event: EventProps;
}

export interface WithEvents {
  events: Array<EventProps>;
}

