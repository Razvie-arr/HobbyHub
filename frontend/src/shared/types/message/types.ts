import { DocumentType } from '../../../gql';

import { MessageFragment } from './fragments';

export type MessageFragmentResultType = DocumentType<typeof MessageFragment>;

export type MessageData = DocumentType<typeof MessageFragment>;

export interface WithMessage {
  message: MessageData;
}

export interface WithMessages {
  messages: Array<MessageData>;
}

export interface WithNonEmptyMessages {
  messages: [MessageData, ...MessageData[]];
}

