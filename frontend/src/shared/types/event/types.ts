import { NonEmptyArray } from 'effect/ReadonlyArray';

import { DocumentType } from '../../../gql';

import { EventFragment } from './fragments';

export type EventData = DocumentType<typeof EventFragment>;

export interface WithEvent {
  event: EventData;
}

export interface WithEvents {
  events: Array<EventData>;
}

export interface WithNonEmptyEvents {
  events: NonEmptyArray<EventData>;
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

