import { sendEventCancelledEmail } from '../../../emails/event/sendEventCancelledEmail';
import { Event, User } from '../../../types';

export const sendMassEventCancelledEmail = async (event: Event, eventParticipants: Set<User>, serverUrl: string) => {
  const eventName = event.name;
  const subject = `📢 ${event.name} was cancelled`;

  for (const eventParticipant of eventParticipants) {
    await sendEventCancelledEmail(eventParticipant.email, subject, eventName, serverUrl);
  }
};
