import { sendEmail } from '../../libs/nodeMailer';
import { getFrontendUrl, getGroupLink } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendGroupRegistrationDeclinedEmail = async (
  email: string,
  groupId: number,
  groupName: string,
  serverUrl: string,
) => {
  const subject = 'Group participation declined';
  const groupLink = getGroupLink(serverUrl, groupId);
  try {
    await sendEmail(email, subject, createHtml(groupLink, groupName, getFrontendUrl(serverUrl)));
  } catch (error) {
    throw error;
  }
};

const createHtml = (groupLink: string, groupName: string, frontendUrl: string): string => {
  const content = createEmailContent(groupLink, groupName);
  const header = 'The organizer denied your request to join';
  const linkText = 'Check group';
  const headerImgUrl = frontendUrl + '/assets/registration_declined.svg';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    content: content,
    headerImgUrl: headerImgUrl,
    link: groupLink,
    linkText: linkText,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = (groupLink: string, groupName: string) => {
  const template = 'registrationAcceptedOrDeclined';
  const decision = `Unfortunately, your registration for group <a href="${groupLink}">${groupName}</a> has been declined.`;
  const context = {
    name: groupName,
    decision: decision,
  };
  return createDesignedContent(template, context);
};
