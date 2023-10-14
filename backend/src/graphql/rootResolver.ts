import { type Resolvers } from '../types/graphqlTypesGenerated';

import { eventResolver, eventsResolver } from './modules/event/eventResolvers';
import { eventTypeResolver, eventTypesResolver } from './modules/eventType/eventTypeResolver';
import { locationResolver, locationsResolver } from './modules/location/locationResolver';
import { signInResolver, signUpResolver } from './modules/user/userResolver';

export const rootResolver: Resolvers = {
  Query: {
    event: eventResolver,
    events: eventsResolver,
    eventType: eventTypeResolver,
    eventTypes: eventTypesResolver,
    location: locationResolver,
    locations: locationsResolver,
  },

  Mutation: {
    signIn: signInResolver,
    signUp: signUpResolver,
  },
};
