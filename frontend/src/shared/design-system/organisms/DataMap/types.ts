import { NonEmptyReadonlyArray } from 'effect/dist/declarations/src/ReadonlyArray';

import { EventProps, GroupProps, WithNullableAuthUser } from '../../../types';

interface EventMapDataArray extends WithNullableAuthUser {
  type: 'event';
  dataArray: NonEmptyReadonlyArray<EventProps>;
}

interface GroupMapDataArray extends WithNullableAuthUser {
  type: 'group';
  dataArray: NonEmptyReadonlyArray<GroupProps>;
}

export type MapDataArray = EventMapDataArray | GroupMapDataArray;

interface EventMapData {
  type: 'event';
  data: EventProps;
}

interface GroupMapData {
  type: 'group';
  data: GroupProps;
}

export type MapData = EventMapData | GroupMapData;

