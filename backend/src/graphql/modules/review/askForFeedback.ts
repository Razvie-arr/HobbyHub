import { sendEmail } from '../../../libs/nodeMailer';
import { Event, User } from '../../../types';

export const askForFeedback = async (user: User, event: Event, serverUrl: string) => {
  const userFirstName = user.first_name;

  const reviewSubject = 'Please leave your feedback';
  const link = `${serverUrl}/addReview?eventId=${event.id}`;

  const emailTextMessage = `Hey ${userFirstName}!\n
  Hope you rocked the ${event.name}! 🚀 We're dying to hear what's on your mind. 
  Can you spill the tea and spill about your experience? It's like our event got a major glow-up, and you're the trendsetter!
  \nTap here to spill the deets: ${link}.\n\nCheers,\nHobbyHub`;
  const emailHtmlMessage = `<p>Hey ${userFirstName}!</p>
  <p>Hope you rocked the <strong>${event.name}</strong>! 🚀 We're dying to hear what's on your mind. 
  Can you spill the tea and spill about your experience? It's like our event got a major glow-up, and you're the trendsetter!</p>
  <p><a href="${link}">Tap here to spill the deets</a></p>
  <p>Cheers, <br> HobbyHub</p>`;

  try {
    await sendEmail(user.email, reviewSubject, {
      text: emailTextMessage,
      html: emailHtmlMessage,
    });
  } catch (error) {
    throw error;
  }
};
