import { client } from 'websocket';

export default (options) => {

	const { ws, initCallback, subscribeCallback } = options;

	const websocketClient = new client();

	websocketClient.on('connectFailed', function(error) {
		console.log('Connect Error: ' + error.toString());
	});

	websocketClient.on('connect', function(connection) {
		console.log('WebSocket Client Connected');

		if (initCallback && typeof initCallback === 'function') {
			initCallback(connection);
		}

		connection.on('message', function(data) {

			if (subscribeCallback && typeof subscribeCallback === 'function') {
				subscribeCallback(data);
			}
		});

		connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function() {
        console.log('Connection Closed');
    });
	});

	websocketClient.connect(ws);

	return websocketClient;
}
