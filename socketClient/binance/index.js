import { isEqual } from 'lodash';

import createSocketClient from '../utils/createSocketClient';
import pairs from '../../data/pairs';

import { UPDATE_TICKER } from '../../graphql/topics';
import getPubSub from '../../graphql/utils/getPubSub.js';

const pairData = {};
let ws = 'wss://stream.binance.com:9443/ws/';

for (let i = 0; i < pairs.length; i++) {
	const pair = pairs[i].toLowerCase();

	ws = `${ws}${pair}@ticker/`;
}

const dataFormatter = (data) => {
	const _data = JSON.parse(data.utf8Data);
	const pair = _data.s;

  const ticker = {
    exchange: 'Binance',
    price: parseFloat(_data.c),
    vol: parseFloat(_data.v),
    pct: parseFloat(_data.P)
  };

  // 和上次資料相同，不需要更新
  // 因為 Binance 不像 Bitfinex 有丟 hb，而是不論資料有無更新每秒都會丟
  if (pairData[pair] && isEqual(pairData[pair], ticker)) return;

  pairData[pair] = ticker;

  return {
    symbol: pair,
    ticker: {
      exchange: 'Binance',
      price: parseFloat(_data.c),
      vol: parseFloat(_data.v),
      pct: parseFloat(_data.P),
    }
  }
}

export const subscribeBinance = () => {
  const pubsub = getPubSub();
	const options = {
		ws,
		subscribeCallback: (data) => {
			const updatedTicker = dataFormatter(data);

      if (updatedTicker) pubsub.publish(UPDATE_TICKER, { updateTicker: updatedTicker });
		}
	}
	createSocketClient(options);
};
