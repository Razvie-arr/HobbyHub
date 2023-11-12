import { DocumentType } from '../../../gql';

import { MessageFragment } from './fragments';

export type MessageFragmentResultType = DocumentType<typeof MessageFragment>;

export type MessageData = DocumentType<typeof MessageFragment>;

export interface WithMessage {
  thread: MessageData;
}

export interface WithMessages {
  threads: Array<MessageData>;
}

export interface WithNonEmptyMessages {
  threads: [MessageData, ...MessageData[]];
}

