import { EventsQuery } from 'src/gql/graphql';

type ArrayType<T extends unknown[]> = T extends Array<infer U> ? U : never;

export type EventProps = NonNullable<ArrayType<NonNullable<EventsQuery['events']>>>;

export interface WithEvent {
  event: EventProps;
}

export interface WithEvents {
  events: Array<EventProps>;
}

export type EventTypeName =
  | 'Football'
  | 'Games'
  | 'Basketball'
  | 'Volleyball'
  | 'Tennis'
  | 'Running'
  | 'Golf'
  | 'Playstation'
  | 'Board games';

