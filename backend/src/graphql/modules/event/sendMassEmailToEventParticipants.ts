import { sendEmail } from '../../../libs/nodeMailer';
import { Event, User } from '../../../types';

import { getEventLink } from './getEventLink';

export const sendMassEmailToEventParticipants = async (
  event: Event,
  eventParticipants: Array<User>,
  emailSubject: string,
  emailBody: string,
  serverUrl: string,
) => {
  const eventName = event.name;
  const eventLink = getEventLink(serverUrl, event.id);
  const emailBodyWithFooter = emailBody + createFooter(eventName, eventLink);
  const emailBodyWithFooterHtml = emailBody + createFooterHtml(eventName, eventLink);

  for (const eventParticipant of eventParticipants) {
    try {
      await sendEmail(eventParticipant.email, emailSubject, {
        text: emailBodyWithFooter,
        html: emailBodyWithFooterHtml,
      });
    } catch (error) {
      throw error;
    }
  }
};

const createFooter = (eventName: string, eventLink: string): string =>
  `\nThis email was sent from ${eventName} admin. Open ${eventLink} to view the event`;

const createFooterHtml = (eventName: string, eventLink: string): string => `<br><br><p>
  <i>This email was sent from<b> ${eventName} </b>admin. Open<a href="${eventLink}"> link </a>to view the event.</i>
</p>`;
