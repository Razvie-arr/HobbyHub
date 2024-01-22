import { sendEmail } from '../../libs/nodeMailer';
import { getEventLink, getFrontendUrl } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendEventRegistrationDeclinedEmail = async (
  email: string,
  eventId: number,
  eventName: string,
  serverUrl: string,
) => {
  const subject = 'Event registration declined';
  const eventLink = getEventLink(serverUrl, eventId);
  try {
    await sendEmail(email, subject, createHtml(eventLink, eventName, getFrontendUrl(serverUrl)));
  } catch (error) {
    throw error;
  }
};

const createHtml = (eventLink: string, eventName: string, frontendUrl: string): string => {
  const content = createEmailContent(eventLink, eventName);
  const header = 'The organizer denied your request to join';
  const linkText = 'Check event';
  const headerImgUrl = frontendUrl + '/assets/registration_declined.png';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    content: content,
    headerImgUrl: headerImgUrl,
    link: eventLink,
    linkText: linkText,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = (eventLink: string, eventName: string) => {
  const template = 'registrationAcceptedOrDeclined';
  const decision = `Unfortunately, your registration for event <a href="${eventLink}">${eventName}</a> has been declined.`;
  const context = {
    name: eventName,
    decision: decision,
  };
  return createDesignedContent(template, context);
};
