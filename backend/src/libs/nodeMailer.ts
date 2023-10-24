import nodemailer from 'nodemailer';

const EMAIL_USER = '4sa540team1throwaway@gmail.com';
const EMAIL_PASSWD = 'xsmtpsib-48bae8923a44385ca7ed04180e4530644ebb9ac7f47f27b29877be4cf1d6da37-3JO75kHGwtNMqhE1';

export const sendVerificationEmail = async (
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
      pass: EMAIL_PASSWD,
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
