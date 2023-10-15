import { Event, Location, User } from 'src/gql/graphql';

export type EventProps = Omit<Event, 'author' | 'location'> & { author: Omit<User, 'email' | 'id' | 'password'> } & {
  location: Omit<Location, 'id'>;
};

