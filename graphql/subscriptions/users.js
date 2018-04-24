import getPubSub from '../utils/getPubSub';
import { USERS_CHANGED } from '../topics';

export default {
	userAdded: {
    subscribe: () => {
      const pubsub = getPubSub();

      console.log('subscribe');
      return pubsub.asyncIterator(USERS_CHANGED);
    }
  },
}