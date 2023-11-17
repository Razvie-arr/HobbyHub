export const route = {
  home: () => `/`,

  events: () => `/events`,
  eventDetails: (eventId?: number) => `/event/${eventId ?? ':eventId'}`,
  searchEvents: () => `/searchEvents`,
  createEvent: () => `/createEvent`,
  editEvent: (eventId?: number) => `/editEvent/${eventId ?? ':eventId'}`,

  groups: () => `/groups`,
  groupDetails: (groupId?: number) => `/group/${groupId ?? ':groupId'}`,
  editGroup: (groupId?: number) => `/editGroup/${groupId ?? ':groupId'}`,

  onboarding: () => `/onboarding`,
  verifyUser: () => `/auth/verifyUser`,
  messages: () => `/messages`,
};
