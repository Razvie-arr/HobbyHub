import { ReactNode } from 'react';
import { NonEmptyArray } from 'effect/ReadonlyArray';

import { WithId, WithLocationFragment } from '../../../types';

export type MapData = WithLocationFragment & WithId;

interface CommonProps {
  height?: string;
}

export interface SingleDataMapProps<T extends MapData> extends CommonProps {
  type: 'single';
  data: T;
}

export interface MultipleDataMapProps<T extends MapData> extends CommonProps {
  type: 'multiple';
  data: NonEmptyArray<T>;
  renderMarkerContent: (data: T) => ReactNode;
}

export type DataMapProps<T extends MapData> = SingleDataMapProps<T> | MultipleDataMapProps<T>;

