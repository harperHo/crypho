import createSocketClient from '../utils/createSocketClient';
import pairs from '../configs/pairs';

let bitfinexSktObj = null;
const pairChanMap = {};

const channelList = [];

for (let i = 0; i < pairs.length; i++) {
	const pair = pairs[i];
	channelList.push({
		"event": "subscribe",
		"channel": "ticker",
		"pair": `${pair[0]}${pair[1]}`
	})
}

const dataFormatter = (data, cb) => {
	const _data = JSON.parse(data.utf8Data);

	if (_data.event !== 'info' && _data[1] !== 'hb') {

		if (_data.event === 'subscribed') {
			pairChanMap[_data.chanId] = _data.pair;
		} else {
			const pair = pairChanMap[_data[0]];
			const socketData = {};
			const base = pair.substring(0, 3);

			socketData.exchange = 'Bitfinex';
			socketData.pct = _data[6] * 100;
			socketData.price = _data[7];
			socketData.vol = _data[8];

			cb({
				currency: base,
				data: socketData
			})
		}
	}
}

export const subscribeBitfinex = (cb) => {
	const options = {
		ws: 'wss://api.bitfinex.com/ws',
		initCallback: (connection) => {
			for (let j = 0; j < channelList.length; j++) {
				connection.send(JSON.stringify(channelList[j]));
			}
		},
		subscribeCallback: (data) => {
			dataFormatter(data, cb);
		}
	}

	bitfinexSktObj = createSocketClient(options);
};

