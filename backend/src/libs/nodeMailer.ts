import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (targetEmail: String, token: String) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '959d752cd49a19',
      pass: '9ce0a80758fc53',
    },
  });

  const text = `Please verify your email via this link! \n link?=${token.toString()}`;

  const mailOptions = {
    from: 'no-reply@hobby.hub',
    to: targetEmail.toString(),
    subject: 'Verification email',
    text: text,
  };

  return transporter.sendMail(mailOptions);
};
