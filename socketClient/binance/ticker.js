import createSocketClient from '../utils/createSocketClient';

let ticker;

export const subscribeTicker = (base, quote) => {
	const _base = base.toLowerCase();
	const _quote = quote.toLowerCase();
	const ws = `wss://stream.binance.com:9443/ws/${_base}${_quote}@ticker`;
	const socketClient = createSocketClient(ws);

	socketClient.on('connect', function(connection) {
		connection.on('message', function(data) {
		  ticker = data.utf8Data;
		});
	});
}

export const getTicker = () => ticker;