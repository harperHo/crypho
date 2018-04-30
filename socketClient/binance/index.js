import createSocketClient from '../utils/createSocketClient';
import pairs from '../configs/pairs';

let binanceSktObj = null;
const pairChanMap = {};

let ws = 'wss://stream.binance.com:9443/ws/';

for (let i = 0; i < pairs.length; i++) {
	const pair = pairs[i];
	let base = pair[0].toLowerCase();
	let quote = pair[1].toLowerCase();

	base = base === 'usd' ? 'usdt' : base;
	quote = quote === 'usd' ? 'usdt' : quote;

	ws = `${ws}${base}${quote}@ticker/`;
}

const dataFormatter = (data, cb) => {
	const _data = JSON.parse(data.utf8Data);
	const pair = _data.s;
	const socketData = {};
	const base = pair.substring(0, 3);
	const quote = 'usd';

	socketData.exchange = 'Binance';
	socketData.pct = parseFloat(_data.P);
	socketData.price = parseFloat(_data.c);
	socketData.vol = parseFloat(_data.v);

	cb({
		currency: base,
		data: socketData
	});
}

export const subscribeBinance = (cb) => {
	const options = {
		ws,
		subscribeCallback: (data) => {
			dataFormatter(data, cb);
		}
	}

	binanceSktObj = createSocketClient(options);
};
