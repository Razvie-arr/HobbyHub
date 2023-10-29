export const route = {
  home: () => `/`,
  events: () => `/events`,
  searchEvents: () => `/searchEvents`,
  createEvent: () => `/createEvent`,
  editEvent: (eventId?: number) => `/editEvent/${eventId ?? ':eventId'}`,
  eventDetails: (eventId?: number) => `/event/${eventId ?? ':eventId'}`,
  onboarding: () => `/onboarding`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  verifyUser: () => `/auth/verifyUser`,
  groups: () => `/groups`,
};

