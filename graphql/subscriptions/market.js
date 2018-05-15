import { withFilter } from 'graphql-subscriptions';

import getPubSub from '../utils/getPubSub';
import { UPDATE_TICKER } from '../topics';

export default {
	updateTicker: {
    // resolve: (payload, args) => {
    //   const currencies = args.currencies;
    //   if (currencies.length > 0) {
    //     return payload.updateTicker.filter(currency => currencies.includes(currency.currency));
    //   }
    //   return payload.updateTicker;
    // },
    subscribe: () => {
      const pubsub = getPubSub();
      return pubsub.asyncIterator(UPDATE_TICKER);
    }
  },
}
