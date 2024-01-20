export const getEventLink = (serverUrl: string, eventId: number): string => {
  const protocol = 'https://';
  const frontendUrl = serverUrl.includes('dev')
    ? 'dev-frontend-team01-vse.handson.pro'
    : 'frontend-team01-vse.handson.pro';
  return protocol + frontendUrl + `/event/${eventId}`;
};
