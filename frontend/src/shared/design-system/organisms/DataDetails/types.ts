import { ReactNode } from 'react';
import { IconType } from 'react-icons/lib';
import { To } from 'react-router-dom';

import { EventData, GroupData, WithAuthUser } from '../../../types';
import { MapData } from '../DataMap';

interface CommonProps {
  user: WithAuthUser['user'] | null;
  editRoute: To;
}

export interface EventDataDetails extends CommonProps {
  type: 'event';
  data: EventData;
}

export interface GroupDataDetails extends CommonProps {
  type: 'group';
  data: GroupData;
}

export type DataDetailsProps = EventDataDetails | GroupDataDetails;

export interface WithAdditionalTabs {
  additionalTabs?: Array<{ title: ReactNode; content: ReactNode }>;
}

export interface WithTabs {
  tabs: Array<{ title: ReactNode; content: ReactNode }>;
}

export interface DateDetailsCardProps {
  title: string;
  description: string;
  items: Array<{ icon: IconType; content: ReactNode }>;
  mapData: MapData;
}

export interface WithSideCardProps {
  sideCardProps: DateDetailsCardProps;
}

export interface WithDeleteButton {
  deleteButton?: ReactNode;
}

