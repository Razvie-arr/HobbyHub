import { sendEmail } from '../../libs/nodeMailer';
import { getFrontendUrl } from '../../utils/helpers';

export const sendResetPasswordEmail = async (email: string, resetToken: string, serverUrl: string) => {
  const subject = 'Reset password link';
  const resetLink = getResetLink(resetToken, getFrontendUrl(serverUrl));

  try {
    await sendEmail(email, subject, createHtml(resetLink));
  } catch (error) {
    throw error;
  }
};

const createHtml = (resetLink: string): string =>
  `Please reset your password using this <a href="${resetLink}">link</a>`;

const getResetLink = (resetToken: string, frontendUrl: string) => {
  const link = `/resetPassword?token=${resetToken}`;
  return frontendUrl + link;
};
