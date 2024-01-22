import { sendEmail } from '../../libs/nodeMailer';
import { getFrontendUrl } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendEventCancelledEmail = async (email: string, subject: string, eventName: string, serverUrl: string) => {
  try {
    const frontendUrl = getFrontendUrl(serverUrl);
    await sendEmail(email, subject, createHtml(eventName, getFrontendUrl(frontendUrl)));
  } catch (error) {
    throw error;
  }
};

const createHtml = (eventName: string, frontendUrl: string): string => {
  const header = "You've been logged out from the event";
  const headerImgUrl = frontendUrl + '/assets/cancel.png';
  const content = createEmailContent(eventName);

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    headerImgUrl: headerImgUrl,
    content: content,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = (eventName: string): string => {
  const template = 'eventCancelledEmailContent';
  const context = {
    eventName: eventName,
  };
  return createDesignedContent(template, context);
};
