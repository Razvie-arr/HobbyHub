import { ReactNode } from 'react';
import { To } from 'react-router-dom';

import { EventProps, GroupProps, WithAuthUser } from '../../../types';

interface CommonProps {
  user: WithAuthUser['user'] | null;
  editRoute: To;
}

export interface EventDataDetails extends CommonProps {
  type: 'event';
  data: EventProps;
}

export interface GroupDataDetails extends CommonProps {
  type: 'group';
  data: GroupProps;
}

export type DataDetailsProps = EventDataDetails | GroupDataDetails;

export interface WithAdditionalTabs {
  additionalTabs?: Array<{ title: ReactNode; content: ReactNode }>;
}
