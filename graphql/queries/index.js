import { merge } from 'lodash'
import market from './market';;
import users from './users';
import posts from './posts';

export default merge(
	{},
  market,
	users,
	posts
);
