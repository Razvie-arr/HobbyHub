import { SQLDataSource } from '../../../datasource';
import { sendEmail } from '../../../libs/nodeMailer';
import { Event, User } from '../../../types';

export const sendMassEventCancelledEmail = async (
  event: Event,
  eventParticipants: Set<User>,
  dataSources: { sql: SQLDataSource },
  serverUrl: string,
) => {
  const eventName = event.name;
  const subject = `📢 ${event.name} was cancelled`;
  const eventLink = getEventLink(serverUrl, event.id);

  for (const eventParticipant of eventParticipants) {
    try {
      await sendEmail(eventParticipant.email, subject, {
        text: createText(eventParticipant.first_name, eventName, eventLink),
        html: createHtml(eventParticipant.first_name, eventName, eventLink),
      });
    } catch (error) {
      throw error;
    }
  }
};

const createText = (userName: string, eventName: string, eventLink: string): string =>
  `Hey ${userName}\n,
  
  Quick heads up: unfortunately, we've had to cancel ${eventName}. 😔 Check out the event link ${eventLink} for more info.\n
  
  Sorry for any inconvenience, and we appreciate your understanding!\n\n
  
  Cheers,\n
  HobbyHub`;

const createHtml = (userName: string, eventName: string, eventLink: string): string =>
  `<p>Hey ${userName},</p>

    <p>Quick heads up: unfortunately, we've had to cancel ${eventName}. 😔 Check out the event <a href="${eventLink}">link</a> for more info.</p>

    <p>Sorry for any inconvenience, and we appreciate your understanding!</p>

    <p>Cheers,<br>
    HobbyHub</p>`;

const getEventLink = (serverUrl: string, eventId: number): string => {
  const protocol = 'https://';
  const frontendUrl = serverUrl.includes('dev')
    ? 'dev-frontend-team01-vse.handson.pro'
    : 'frontend-team01-vse.handson.pro';
  return protocol + frontendUrl + `/event/${eventId}`;
};
