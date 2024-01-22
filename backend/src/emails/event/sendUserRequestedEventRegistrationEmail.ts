import { sendEmail } from '../../libs/nodeMailer';
import { getEventLink, getFrontendUrl } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendUserRequestedEventRegistrationEmail = async (
  email: string,
  requestedUserName: string,
  eventName: string,
  eventId: number,
  serverUrl: string,
) => {
  const subject = 'User requested event registration';
  const eventLink = getEventLink(serverUrl, eventId);
  try {
    await sendEmail(
      email,
      subject,
      createHtml(createEmailContent(requestedUserName, eventName), eventLink, getFrontendUrl(serverUrl)),
    );
  } catch (error) {
    throw error;
  }
};

const createHtml = (content: string, eventLink: string, frontendUrl: string): string => {
  const header = 'An user requested to join your event';
  const headerImgUrl = frontendUrl + 'assets/request.svg';
  const linkText = 'Check event';

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

const createEmailContent = (userName: string, eventName: string): string => {
  const template = 'userRequestedEventRegistrationContent';
  const context = {
    eventName: eventName,
    userName: userName,
  };
  return createDesignedContent(template, context);
};
