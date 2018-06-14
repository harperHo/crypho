import rootQuery from './rootQuery';
import rootSubscription from './rootSubscription';

import Currency from './Currency';
import Exchange from './Exchange';
import Ticker from './Ticker';

let typeDefs = '';

typeDefs = typeDefs.concat(
	rootQuery,
	rootSubscription,
	Currency,
	Exchange,
  Ticker
);

export default typeDefs;
