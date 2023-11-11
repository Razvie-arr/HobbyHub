import { DocumentType } from '../../../gql';

import { GroupFragment } from './fragments';

export type GroupFragmentResultType = DocumentType<typeof GroupFragment>;

export type GroupProps = DocumentType<typeof GroupFragment>;

export interface WithGroup {
  Group: GroupProps;
}

export interface WithGroups {
  Groups: Array<GroupProps>;
}

export interface WithNonEmptyGroups {
  Groups: [GroupProps, ...GroupProps[]];
}

