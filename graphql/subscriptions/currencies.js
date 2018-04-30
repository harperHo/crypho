import getPubSub from '../utils/getPubSub';
import { NEW_PRICE } from '../topics';

export default {
	newPrice: {
    subscribe: () => {
      const pubsub = getPubSub();

      console.log('subscribe');
      return pubsub.asyncIterator(NEW_PRICE);
    }
  },
}