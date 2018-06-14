import createSocketClient from '../utils/createSocketClient';
import pairs from '../../data/pairs';

import { UPDATE_TICKER } from '../../graphql/topics';
import getPubSub from '../../graphql/utils/getPubSub.js';

let bitfinexSktObj = null;
const pairChanMap = {};

const channelList = [];

for (let i = 0; i < pairs.length; i++) {
	const pair = pairs[i];
	channelList.push({
		"event": "subscribe",
		"channel": "ticker",
		"pair": pair,
	})
}

const dataFormatter = (data) => {
	const _data = JSON.parse(data.utf8Data);

	if (_data.event !== 'info' && _data[1] !== 'hb') {

    if (_data.event === 'error') return;
		if (_data.event === 'subscribed') {
			pairChanMap[_data.chanId] = _data.pair;
		} else {

      return {
        symbol: pairChanMap[_data[0]],
        ticker: {
          exchange: 'Bitfinex',
          price: _data[7],
          vol: _data[8],
          pct: _data[6] * 100,
        }
      };
		}
	}
}

export const subscribeBitfinex = () => {
  const pubsub = getPubSub();
	const options = {
		ws: 'wss://api.bitfinex.com/ws',
		initCallback: (connection) => {
			for (let j = 0; j < channelList.length; j++) {
				connection.send(JSON.stringify(channelList[j]));
			}
		},
		subscribeCallback: (data) => {
      const updatedTicker = dataFormatter(data);
      if (updatedTicker) pubsub.publish(UPDATE_TICKER, { updateTicker: updatedTicker });
		}
	}

	bitfinexSktObj = createSocketClient(options);
};
