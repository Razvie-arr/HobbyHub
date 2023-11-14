import { ReactNode } from 'react';
import { To } from 'react-router-dom';

import { EventData, GroupData, WithAuthUser } from '../../../types';

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

export interface WithDeleteButton {
  deleteButton?: ReactNode;
}

