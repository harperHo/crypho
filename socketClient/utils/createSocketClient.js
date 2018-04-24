import { client } from 'websocket';

export default (ws, channel) => {
	
	const websocketClient = new client();

	websocketClient.on('connectFailed', function(error) {
		console.log('Connect Error: ' + error.toString());
	});

	websocketClient.on('connect', function(connection) {
		console.log('WebSocket Client Connected');

		if (channel !== undefined) connection.send(channel);

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
