import { merge } from 'lodash';
import users from './users';
import market from './market';

export default merge(
	{},
	users,
	market
);
