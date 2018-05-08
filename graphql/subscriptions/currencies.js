import { withFilter } from 'graphql-subscriptions';

import getPubSub from '../utils/getPubSub';
import { NEW_PRICE } from '../topics';

export default {
	newPrice: {
    resolve: (payload, args) => {
      const currencies = args.currencies;
      if (currencies.length > 0) {
        return payload.newPrice.filter(currency => currencies.includes(currency.currency));
      }
      return payload.newPrice;
    },
    subscribe: () => {
      const pubsub = getPubSub();
      return pubsub.asyncIterator(NEW_PRICE);
    }
  },
}
