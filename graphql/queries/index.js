import { merge } from 'lodash';
import users from './users';
import posts from './posts';

export default merge(
	{},
	users,
	posts
);
