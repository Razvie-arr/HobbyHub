import { sendEmail } from '../../libs/nodeMailer';
import { Review } from '../../types';
import { getFrontendUrl, getUserProfileLink } from '../../utils/helpers';
import { createDesignedContent, createDesignedEmail, EmailData } from '../createDesignedEmail';

export const sendGotReviewEmail = async (
  isParticipant: boolean,
  eventName: string,
  email: string,
  reviewerName: string,
  review: Review,
  serverUrl: string,
) => {
  const subject = 'New review in HobbyHub';
  const profileLink = getUserProfileLink(serverUrl);
  try {
    await sendEmail(
      email,
      subject,
      createHtml(
        isParticipant,
        reviewerName,
        createEmailContent(eventName, review),
        profileLink,
        getFrontendUrl(serverUrl),
      ),
    );
  } catch (error) {
    throw error;
  }
};

const createHtml = (
  isParticipant: boolean,
  reviewerName: string,
  content: string,
  profileLink: string,
  frontendUrl: string,
): string => {
  const reviewedPersonStatus = isParticipant ? 'Participant' : 'The organizer';
  const header = `${reviewedPersonStatus} <span style="color: #805AD5">${reviewerName}</span> of`;
  const linkText = 'See Details';
  const headerImgUrl = frontendUrl + '/assets/review.png';

  const emailData: EmailData = {
    frontendUrl: frontendUrl,
    header: header,
    content: content,
    link: profileLink,
    linkText: linkText,
    headerImgUrl: headerImgUrl,
  };
  return createDesignedEmail(emailData);
};

const createEmailContent = (eventName: string, review: Review): string => {
  const template = 'gotReviewEmailContent';
  const { rating } = review;
  const context = {
    eventName: eventName,
    reviewRating: rating,
    reviewText: review.text,
  };
  return createDesignedContent(template, context);
};
