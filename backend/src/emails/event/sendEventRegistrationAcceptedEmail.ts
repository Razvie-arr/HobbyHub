import { sendEmail } from '../../libs/nodeMailer';
import { getEventLink, getFrontendUrl } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendEventRegistrationAcceptedEmail = async (
  email: string,
  eventId: number,
  eventName: string,
  serverUrl: string,
) => {
  const subject = 'Event registration confirmed';
  const eventLink = getEventLink(serverUrl, eventId);
  try {
    await sendEmail(email, subject, createHtml(eventLink, eventName, getFrontendUrl(serverUrl)));
  } catch (error) {
    throw error;
  }
};

const createHtml = (eventLink: string, eventName: string, frontendUrl: string): string => {
  const content = createEmailContent(eventLink, eventName);
  const header = 'The organizer accepted your request to join';
  const linkText = 'Check event';
  const headerImgUrl = frontendUrl + '/assets/event_registration_accepted.svg';

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

const createEmailContent = (eventLink: string, eventName: string): string => {
  const template = 'registrationAcceptedOrDeclined';
  const decision = `Your registration for event <a href="${eventLink}">${eventName}</a> has been confirmed!`;
  const context = {
    name: eventName,
    decision: decision,
  };
  return createDesignedContent(template, context);
};
