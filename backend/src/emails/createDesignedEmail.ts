import fs from 'fs';
import handlebars from 'handlebars';

import { EMAIL_TEMPLATES_FOLDER } from '../config';
import { getFrontendUrl } from '../utils/helpers';

export interface EmailData {
  frontendUrl: string;
  header: string;
  headerImgUrl: string;
  content: string;
  linkText?: string;
  link?: string;
}

export const createDesignedEmail = (emailData: EmailData) => {
  const baseTemplateFile = EMAIL_TEMPLATES_FOLDER + '/baseEmailTemplate.handlebars';
  const baseTemplateContent = fs.readFileSync(baseTemplateFile, 'utf-8');
  const baseTemplate = handlebars.compile(baseTemplateContent);
  return baseTemplate({
    frontendUrl: emailData.frontendUrl,
    header: emailData.header,
    headerImgUrl: emailData.headerImgUrl,
    content: emailData.content,
    linkText: emailData.linkText,
    link: emailData.link,
  });
};

export const createDesignedContent = (templateName: string, context: Object): string => {
  const templateFile = EMAIL_TEMPLATES_FOLDER + '/' + templateName + '.handlebars';
  const templateContent = fs.readFileSync(templateFile, 'utf-8');
  const template = handlebars.compile(templateContent);
  return template(context);
};

export const createTestEmailData = (): EmailData => {
  const frontendUrl = getFrontendUrl('localhost:4000');
  const header = 'The organizer denied your request to join';
  const headerImgUrl = frontendUrl + '/assets/registration_declined.png';
  const content = createTestEmailContent();
  const linkText = 'Check event';

  return {
    frontendUrl: getFrontendUrl('localhost:3000'),
    header: header,
    headerImgUrl: headerImgUrl,
    content: content,
    linkText: linkText,
    link: 'blabla',
  };
};

// for testing purposes
const createTestEmailContent = () => {
  const template = 'eventRegistrationAcceptedOrDeclined';
  const decision = `Unfortunately, your registration for event <a href="123.com">Event name</a> has been declined.`;
  const context = {
    eventName: 'Event name',
    decision: decision,
  };
  return createDesignedContent(template, context);
};
