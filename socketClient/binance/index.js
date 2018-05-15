import { isEqual } from 'lodash';

import createSocketClient from '../utils/createSocketClient';
import currencies from '../../data/currencies';

import { UPDATE_TICKER } from '../../graphql/topics';
import getPubSub from '../../graphql/utils/getPubSub.js';

const pairData = {};
let ws = 'wss://stream.binance.com:9443/ws/';

for (let i = 0; i < currencies.length; i++) {
	const currency = currencies[i].toLowerCase();

	ws = `${ws}${currency}usdt@ticker/`;
}

const dataFormatter = (data) => {
	const _data = JSON.parse(data.utf8Data);
	const pair = _data.s;
	// const socketData = {};
	const base = pair.substring(0, 3);
	const quote = 'usd';

	// socketData.exchange = 'Binance';
	// socketData.pct = parseFloat(_data.P);
	// socketData.price = parseFloat(_data.c);
	// socketData.vol = parseFloat(_data.v);

	// cb({
	// 	currency: base,
	// 	data: socketData
	// });
  const ticker = {
    exchange: 'Binance',
    price: parseFloat(_data.c),
    vol: parseFloat(_data.v),
    pct: parseFloat(_data.P)
  };

  if (pairData[base] && isEqual(pairData[base], ticker)) return; // 和上次資料相同，不需要更新

  pairData[base] = ticker;

  return {
    currency: base,
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
