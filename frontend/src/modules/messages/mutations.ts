import { gql } from '../../gql';

export const EDIT_THREAD_READ = gql(`
  mutation EditReadThread($userId: Int!, $threadId: Int!, $read: Boolean!) {
    editReadThread(userId: $userId, threadId: $threadId, read: $read)
  }
`);

export const SEND_MESSAGE = gql(`
  mutation SendMessage($sender: SenderInput!, $recipient: RecipientInput!, $text: String!) {
    sendMessage(sender: $sender, recipient: $recipient, text: $text)
  }
`);

export const SEND_MASS_MESSAGE = gql(`
  mutation MassEmailToEventParticipants($eventId: Int!, $emailSubject: String!, $emailBody: String!) {
    massEmailToEventParticipants(eventId: $eventId, emailSubject: $emailSubject, emailBody: $emailBody)
  }
`);

