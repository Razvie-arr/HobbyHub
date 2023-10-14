import { type Resolvers } from '../types/graphqlTypesGenerated';
import { signInResolver, signUpResolver } from './modules/user/userResolver';
import { eventTypesResolver, eventTypeResolver } from './modules/eventType/eventTypeResolver';
import { locationsResolver, locationResolver } from './modules/location/locationResolver';
import { eventResolver, eventsResolver } from './modules/event/eventResolvers';

const resolvers: Resolvers = {
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

export default resolvers;

