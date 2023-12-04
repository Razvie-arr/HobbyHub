export const route = {
  home: () => `/` as const,
  events: () => `/` as const,
  eventDetails: (eventId?: number) => `/event/${eventId ?? ':eventId'}` as const,
  createEvent: () => `/createEvent` as const,
  editEvent: (eventId?: number) => `/editEvent/${eventId ?? ':eventId'}` as const,

  groups: () => `/groups` as const,
  groupDetails: (groupId?: number) => `/group/${groupId ?? ':groupId'}` as const,
  createGroup: () => `/createGroup` as const,
  editGroup: (groupId?: number) => `/editGroup/${groupId ?? ':groupId'}` as const,

  search: () => `/search` as const,

  onboarding: () => `/onboarding` as const,
  verifyUser: () => `/auth/verifyUser` as const,
  messages: () => `/messages` as const,
  signin: () => `/signin` as const,
  signup: () => `/signup` as const,
  currentProfile: () => '/profile' as const,
  profile: (userId?: number) => `/profile/${userId ?? ':userId'}` as const,

  addReview: (eventId?: number) => `/addReview${eventId ? `?eventId=${eventId}` : ''}` as const,
  
  editProfile: () => `/editProfile` as const,
};

