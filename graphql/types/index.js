import rootMutation from './rootMutation';
import rootQuery from './rootQuery';
import rootSubscription from './rootSubscription';

import Message from './Message';
import Post from './Post';
import RemoveUserPayload from './RemoveUserPayload';
import User from './User';
import Currency from './Currency';
import Exchange from './Exchange';
import UpdatedTicker from './UpdatedTicker';

let typeDefs = '';

typeDefs = typeDefs.concat(
	rootMutation,
	rootQuery,
	rootSubscription,
	Message,
	Post,
	RemoveUserPayload,
	User,
	Currency,
	Exchange,
  UpdatedTicker
);

export default typeDefs;
