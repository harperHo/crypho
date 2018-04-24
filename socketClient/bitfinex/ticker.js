import createSocketClient from './createSocketClient';
// import tickerNormalizer from '../utils/tickerNormalizer';

const ws = 'wss://api.bitfinex.com/ws';
const channel = {
	"event": "subscribe",
  "channel": "ticker",
  "pair": "BTCUSD"
};
const socketClient = createSocketClient(ws, channel);

socketClient.on('connect', function(connection) {
	connection.on('message', function(data) {

	});
});