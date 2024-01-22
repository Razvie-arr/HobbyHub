import { sendEmail } from '../../libs/nodeMailer';
import { getFrontendUrl, getMessagesLink } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendGotMessageEmail = async (recipientName: string, recipientEmail: string, serverUrl: string) => {
  const subject = 'New message in HobbyHub';

  try {
    await sendEmail(
      recipientEmail,
      subject,
      createHtml(recipientName, getMessagesLink(serverUrl), getFrontendUrl(serverUrl)),
    );
  } catch (error) {
    throw error;
  }
};

const createHtml = (recipientName: string, messagesLink: string, frontendUrl: string) => {
  const header = 'You got a message';
  const content = createEmailContent(recipientName);
  const linkText = 'Check message';
  const headerImgUrl = frontendUrl + '/assets/message.svg';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    content: content,
    link: messagesLink,
    linkText: linkText,
    headerImgUrl: headerImgUrl,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = (recipientName: string) => {
  const template = 'gotMessageEmailContent';
  const context = { recipientName: recipientName };
  return createDesignedContent(template, context);
};
