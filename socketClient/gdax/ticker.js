import createSocketClient from './createSocketClient';

const ws = 'wss://ws-feed.gdax.com';
const channel = {
	type: 'subscribe',
	channels: [
		{
			name: 'ticker',
			product_ids: ['ETH-BTC', 'ETH-USD']
		}
	]
};

const socketClient = createSocketClient(ws, channel);

socketClient.on('connect', function(connection) {
	connection.on('message', function(data) {
	
	});
});