import { DocumentType } from '../../../gql';

import { ThreadFragment } from './fragments';

export type ThreadData = DocumentType<typeof ThreadFragment>;

export interface WithThread {
  thread: ThreadData;
}

export interface WithThreads {
  threads: Array<ThreadData>;
}

export interface WithNonEmptyThreads {
  threads: [ThreadData, ...ThreadData[]];
}

