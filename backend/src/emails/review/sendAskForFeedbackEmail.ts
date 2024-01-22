import { sendEmail } from '../../libs/nodeMailer';
import { Event } from '../../types';
import { getFrontendUrl } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendAskForFeedbackEmail = async (
  isParticipant: boolean,
  email: string,
  event: Event,
  serverUrl: string,
) => {
  const subject = 'Please leave your feedback';
  const link = getAddReviewLink(serverUrl, event.id);

  try {
    await sendEmail(email, subject, createHtml(isParticipant, event.name, link, getFrontendUrl(serverUrl)));
  } catch (error) {
    throw error;
  }
};

const createHtml = (isParticipant: boolean, eventName: string, link: string, frontendUrl: string): string => {
  const ratePerson = isParticipant ? 'organizer' : 'participants';
  const header = `Rate the ${ratePerson} of the event`;
  const content = createEmailContent(eventName, isParticipant);
  const linkText = 'Review';
  const headerImgUrl = frontendUrl + '/assets/review.png';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    content: content,
    link: link,
    linkText: linkText,
    headerImgUrl: headerImgUrl,
  };
  return createDesignedEmail(emailData);
};

const getAddReviewLink = (serverUrl: string, eventId: number): string =>
  getFrontendUrl(serverUrl) + `/addReview?eventId=${eventId}`;

const createEmailContent = (eventName: string, isParticipant: boolean) => {
  const template = 'askForFeedbackEmailContent';
  const text = isParticipant
    ? 'Kindly click the button below to provide feedback on your experience.'
    : 'Share your thoughts on attendees by clicking the button below.';
  const context = {
    eventName: eventName,
    text: text,
  };
  return createDesignedContent(template, context);
};
