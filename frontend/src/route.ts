export const route = {
  home: () => `/`,
  events: () => `/events`,
  createEvent: () => `/createEvent`,
  editEvent: (eventId?: number) => `/editEvent/${eventId ?? ':eventId'}`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  verifyUser: () => `/auth/verifyUser`,
  groups: () => `/groups`,
};

