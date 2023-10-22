import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (
  targetEmail: string,
  targetSubject: string,
  message: string,
  token: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '959d752cd49a19',
      pass: '9ce0a80758fc53',
    },
  });

  const text = `${message}?token=${token.toString()}`;

  const mailOptions = {
    from: 'no-reply@hobby.hub',
    to: targetEmail.toString(),
    subject: targetSubject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

