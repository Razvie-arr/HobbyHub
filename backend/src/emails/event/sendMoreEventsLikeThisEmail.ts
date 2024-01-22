import { sendEmail } from '../../libs/nodeMailer';
import { getEventLink, getFrontendUrl, getUserProfileLinkById } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendMoreEventsLikeThisEmail = async (
  email: string,
  body: string,
  userName: string,
  userId: number,
  eventName: string,
  eventId: number,
  serverUrl: string,
) => {
  const subject = 'More events like this';
  const content = createEmailContent(eventName, body);
  const html = createHtml(
    userName,
    getUserProfileLinkById(serverUrl, userId),
    getEventLink(serverUrl, eventId),
    content,
    getFrontendUrl(serverUrl),
  );
  try {
    await sendEmail(email, subject, html);
  } catch (error) {
    throw error;
  }
};

const createHtml = (
  userName: string,
  userProfileLink: string,
  eventLink: string,
  content: string,
  frontendUrl: string,
): string => {
  const header = `User <a href="${userProfileLink}" style="color: #805AD5; text-decoration: none">${userName}</a> would like to see more events similar to`;
  const headerImgUrl = frontendUrl + '/assets/more_events.svg';
  const linkText = 'Check event';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    headerImgUrl: headerImgUrl,
    content: content,
    link: eventLink,
    linkText: linkText,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = (eventName: string, body: string) => {
  const template = 'moreEventsLikeThisContent';
  const context = {
    eventName: eventName,
    body: body,
  };
  return createDesignedContent(template, context);
};
