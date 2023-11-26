import { DocumentType } from '../../../gql';

import { GroupFragment } from './fragments';

export type GroupData = DocumentType<typeof GroupFragment>;

export interface WithGroup {
  group: GroupData;
}

export interface WithGroups {
  groups: Array<GroupData>;
}

export interface WithNonEmptyGroups {
  groups: [GroupData, ...GroupData[]];
}

