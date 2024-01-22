import { sendEmail } from '../../libs/nodeMailer';
import { getFrontendUrl } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendEmailToEventParticipant = async (
  email: string,
  subject: string,
  body: string,
  organizerName: string,
  eventName: string,
  serverUrl: string,
) => {
  try {
    await sendEmail(
      email,
      subject,
      createHtml(organizerName, eventName, createEmailContent(eventName, body), getFrontendUrl(serverUrl)),
    );
  } catch (error) {
    throw error;
  }
};

const createHtml = (organizerName: string, eventName: string, content: string, frontendUrl: string): string => {
  const header = `The organizer <span style="color: #805AD5">${organizerName}</span> of`;
  const headerImgUrl = frontendUrl + '/assets/message.png';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    content: content,
    headerImgUrl: headerImgUrl,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = (eventName: string, body: string): string => {
  const template = 'emailToEventParticipantContent';
  const context = {
    eventName: eventName,
    body: body,
  };
  return createDesignedContent(template, context);
};
