import { getSQLDataSource } from '../../../datasource';
import { sendEmailToEventParticipant } from '../../../emails/event/sendEmailToEventParticipant';
import { Event, User } from '../../../types';

import { getEventBossId } from './getEventBossId';

export const sendMassEmailToEventParticipants = async (
  event: Event,
  eventParticipants: Array<User>,
  emailSubject: string,
  emailBody: string,
  serverUrl: string,
) => {
  const eventName = event.name;
  const authorId = await getEventBossId(event);
  const author = await getSQLDataSource().users.getById(authorId);
  if (!author) {
    throw new Error('Event author not found');
  }
  const authorName = author.first_name + ' ' + author.last_name;

  for (const eventParticipant of eventParticipants) {
    await sendEmailToEventParticipant(
      eventParticipant.email,
      emailSubject,
      emailBody,
      authorName,
      eventName,
      serverUrl,
    );
  }
};
