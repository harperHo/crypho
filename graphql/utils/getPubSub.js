import { PubSub } from 'graphql-subscriptions';

let pubsub;
const getPubSub = () => {
	if (!pubsub) {
		pubsub = new PubSub();
	}
	return pubsub;
}

export default getPubSub;