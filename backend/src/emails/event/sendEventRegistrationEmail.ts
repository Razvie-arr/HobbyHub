import { sendEmail } from '../../libs/nodeMailer';
import { getEventLink, getFrontendUrl } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendEventRegistrationEmail = async (
  email: string,
  eventName: string,
  eventId: number,
  serverUrl: string,
) => {
  const subject = 'Event registration';
  const eventLink = getEventLink(serverUrl, eventId);
  try {
    await sendEmail(email, subject, createHtml(createEmailContent(eventName), eventLink, getFrontendUrl(serverUrl)));
  } catch (error) {
    throw error;
  }
};

const createHtml = (content: string, eventLink: string, frontendUrl: string): string => {
  const header = 'Your application has been received for the event';
  const headerImgUrl = frontendUrl + 'assets/event_registration.svg';
  const linkText = 'Check event';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    content: content,
    headerImgUrl: headerImgUrl,
    link: eventLink,
    linkText,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = (eventName: string): string => {
  const template = 'eventRegistrationEmailContent';
  const context = {
    eventName: eventName,
  };
  return createDesignedContent(template, context);
};
