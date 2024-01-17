import nodemailer from 'nodemailer';

import { EMAIL_PASSWORD, EMAIL_USER } from '../config';

export const sendEmail = async (
  targetEmail: string,
  targetSubject: string,
  { text, html }: { text: string; html?: string },
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'HobbyHub <no-reply@hobby-hub.io>',
    to: targetEmail.toString(),
    subject: targetSubject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};
