import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';

import config from './configs';
import schema from './graphql';
import socketClient from './socketClient';

const app = express();

app.use(cors());

app.use('/graphql', bodyParser.json(), graphqlExpress({
	schema
}));

const server = createServer(app);

app.set('port', config.port);
const port = app.get('port');

// Register API middleware
app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
	subscriptionsEndpoint: `ws://localhost:3000/`,
}));

server.listen(port, () => {

	// Set up the WebSocket for handling GraphQL subscriptions.
	new SubscriptionServer({ schema, execute, subscribe }, { server, path: '/'});

	console.log(`GraphQL Server is now running on http://localhost:3000`);
  console.log(`Subscriptions are running on ws://localhost:3000/subscriptions`);
});
