import { type Resolvers } from '../types/graphqlTypesGenerated';
import { signInResolver, signUpResolver } from './modules/user/userResolver';

const resolvers: Resolvers = {
  Mutation: {
    signIn: signInResolver,
    signUp: signUpResolver,
  },
};

export default resolvers;
