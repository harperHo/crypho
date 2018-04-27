import createSocketClient from '../utils/createSocketClient';

const socketData = {};

export const subscribeTicker = (base, quote) => {
	const _base = base.toLowerCase();
	const _quote = quote.toLowerCase();
	const ws = `wss://stream.binance.com:9443/ws/${_base}${_quote}@ticker`;
	const socketClient = createSocketClient(ws);

	socketClient.on('connect', function(connection) {
		connection.on('message', function(data) {
			const _data = JSON.parse(data.utf8Data);

			socketData.pct = _data.P;
		  socketData.price = _data.c;
			socketData.vol = _data.v; // base asset volume
		});
	});
}

export const getSocketData = () => socketData;