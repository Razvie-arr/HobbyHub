import { SQLDataSource } from '../../../datasource';
import { sendEmail } from '../../../libs/nodeMailer';
import { Review, User } from '../../../types';

export const sendReviewNotification = async (
  review: Review,
  dataSources: { sql: SQLDataSource },
  serverUrl: string,
) => {
  const user = (await dataSources.sql.users.getById(review.user_id)) as unknown as User;
  const reviewer = (await dataSources.sql.users.getById(review.reviewer_id)) as unknown as User;
  if (!user) {
    throw Error('User does not exist');
  }
  if (!reviewer) {
    throw Error('Reviewer does not exist');
  }

  const userName = user.first_name;
  const reviewerFullName = reviewer.first_name + reviewer.last_name;

  const reviewSubject = 'New review in HobbyHub';
  const emailTextMessage = `Hi ${userName}! You just got a new review from ${reviewerFullName}\n 
                                        Review text: ${review.text}, rating: ${review.rating} \n
                                        View reviews using this link ${serverUrl}/users/${user.id}`;
  const emailHtmlMessage = `Hi ${userName}! You just got a new review from ${reviewerFullName}
                                        <br>Review text: ${review.text}, rating: ${review.rating} <br>
                                        <br> View reviews using this <a href="${serverUrl}/users/${user.id}">link </a>`;

  try {
    await sendEmail(user.email, reviewSubject, {
      text: emailTextMessage,
      html: emailHtmlMessage,
    });
  } catch (error) {
    throw error;
  }
};
