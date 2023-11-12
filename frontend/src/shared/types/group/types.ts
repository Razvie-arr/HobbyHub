import { DocumentType } from '../../../gql';

import { GroupFragment } from './fragments';

export type GroupFragmentResultType = DocumentType<typeof GroupFragment>;

export type GroupProps = DocumentType<typeof GroupFragment>;

export interface WithGroup {
  group: GroupProps;
}

export interface WithGroups {
  groups: Array<GroupProps>;
}

export interface WithNonEmptyGroups {
  groups: [GroupProps, ...GroupProps[]];
}

