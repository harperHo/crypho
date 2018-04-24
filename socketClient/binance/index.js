import { subscribeTicker, getTicker } from './ticker';

// Trigger subscription
export const subscribeExchangeData = (base, quote) => {
	subscribeTicker(base, quote);
};

// Compose data here
export const getExchangeData = () => {
	return {
		ticker: getTicker()
	};
}