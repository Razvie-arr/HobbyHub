import { NonEmptyReadonlyArray } from 'effect/dist/declarations/src/ReadonlyArray';

import { EventData, GroupData, WithNullableAuthUser } from '../../../types';

interface EventMapDataArray extends WithNullableAuthUser {
  type: 'event';
  dataArray: NonEmptyReadonlyArray<EventData>;
}

interface GroupMapDataArray extends WithNullableAuthUser {
  type: 'group';
  dataArray: NonEmptyReadonlyArray<GroupData>;
}

export type MapDataArray = EventMapDataArray | GroupMapDataArray;

interface EventMapData {
  type: 'event';
  data: EventData;
}

interface GroupMapData {
  type: 'group';
  data: GroupData;
}

export type MapData = EventMapData | GroupMapData;
