import { makeExecutableSchema } from 'graphql-tools';

import queries from './queries';
import mutations from './mutations';
import subscriptions from './subscriptions';
import typeDefs from './types'

const resolvers = {
	Query: queries,
	Mutation: mutations,
	Subscription: subscriptions,
};

export default makeExecutableSchema({ typeDefs, resolvers });
