export const route = {
  home: () => `/`,
  events: () => `/events`,
  searchEvents: () => `/searchEvents`,
  createEvent: () => `/createEvent`,
  editEvent: (eventId?: number) => `/editEvent/${eventId ?? ':eventId'}`,
  eventDetails: (eventId?: number) => `/event/${eventId ?? ':eventId'}`,
  groupDetails: (groupId?: number) => `/group/${groupId ?? ':groupId'}`,
  onboarding: () => `/onboarding`,
  verifyUser: () => `/auth/verifyUser`,
  messages: () => `/messages`,
  groups: () => `/groups`,
};
