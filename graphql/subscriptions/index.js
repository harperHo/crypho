import { merge } from 'lodash';
import users from './users';
import currencies from './currencies';

export default merge(
	{},
	users,
	currencies
);
