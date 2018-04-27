import { merge } from 'lodash';

import { subscribeBitfinex } from './bitfinex';

let result = {};

const compose = (_data) => {
	const { exchange, base, quote, data } = _data;

	const obj = {
		[base]: {
			[exchange]: data
		}
	};

	result = merge(result, obj);

	console.log(result);
};

subscribeBitfinex(compose);
