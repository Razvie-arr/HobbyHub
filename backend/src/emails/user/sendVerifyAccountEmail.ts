import { sendEmail } from '../../libs/nodeMailer';
import { getFrontendUrl } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendVerifyAccountEmail = async (email: string, token: string, serverUrl: string) => {
  const subject = 'Verification email';
  const frontendUrl = getFrontendUrl(serverUrl);
  const verificationLink = getVerificationLink(token, frontendUrl);

  try {
    await sendEmail(email, subject, createHtml(verificationLink, frontendUrl));
  } catch (error) {
    throw error;
  }
};

const createHtml = (verificationLink: string, frontendUrl: string): string => {
  const header = 'Verify your email address';
  const content = createEmailContent();
  const linkText = 'Confirm email';
  const headerImgUrl = frontendUrl + '/assets/verify.png';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    content: content,
    link: verificationLink,
    linkText: linkText,
    headerImgUrl: headerImgUrl,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = () => {
  const template = 'verifyAccountEmailContent';
  return createDesignedContent(template, {});
};
const getVerificationLink = (token: string, frontendUrl: string) => {
  const link = `/auth/verifyUser?token=${token}`;
  return frontendUrl + link;
};
