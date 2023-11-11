import { DocumentType } from '../../../gql';

import { EventFragment } from './fragments';

export type EventFragmentResultType = DocumentType<typeof EventFragment>;

export type EventProps = DocumentType<typeof EventFragment>;

export interface WithEvent {
  event: EventProps;
}

export interface WithEvents {
  events: Array<EventProps>;
}

export interface WithNonEmptyEvents {
  events: [EventProps, ...EventProps[]];
}

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

