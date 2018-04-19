import rootMutation from './rootMutation';
import rootQuery from './rootQuery';
import rootSubscription from './rootSubscription';

import Message from './Message';
import Post from './Post';
import RemoveUserPayload from './RemoveUserPayload';
import User from './User';

let typeDefs = '';

typeDefs = typeDefs.concat(
	rootMutation,
	rootQuery,
	rootSubscription,
	Message,
	Post,
	RemoveUserPayload,
	User
);

export default typeDefs;
