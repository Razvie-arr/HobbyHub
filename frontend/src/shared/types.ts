import { AuthUser } from '../gql/graphql';

export type EventTypeName =
  | 'Football'
  | 'Basketball'
  | 'Beach volleyball'
  | 'Floorball'
  | 'Biking'
  | 'Squash'
  | 'Yoga'
  | 'Badminton'
  | 'Volleyball'
  | 'Tennis'
  | 'Running'
  | 'Golf'
  | 'Playstation'
  | 'Hockey'
  | 'Poker'
  | 'eGaming'
  | 'Board games'
  | 'Walking'
  | 'Meet new people'
  | 'Hiking'
  | 'Ferata'
  | 'Walking the dog'
  | 'Strollering';

export interface WithAuthUser {
  user: AuthUser;
}

