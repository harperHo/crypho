import { subscribeTicker, getSocketData } from './ticker';

// Trigger subscription
export const subscribeExchangeData = (base, quote) => {
	subscribeTicker(base, quote);
};

// Compose data here
export const getExchangeData = () => {
	return Object.assign({}, getSocketData())
}