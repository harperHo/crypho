import { subscribeExchangeData, getExchangeData } from './binance';

subscribeExchangeData('ETH', 'BTC');

setInterval(() => {
	console.log(getExchangeData());
}, 2000);
