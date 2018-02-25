const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		if (message === 'arduino') {
	  	// Broadcast to unity that the arduino joined
	  	wss.clients.forEach(function each(client) {
	  		if (client !== ws && client.readyState === WebSocket.OPEN) {
	  			client.send(message);
	  		}
	  	});
	  } else {
	  	console.log('received: %s', message);
	  	wss.clients.forEach(function each(client) {
	  		if (client !== ws && client.readyState === WebSocket.OPEN) {
	  			client.send(message);
	  		}
	  	});
	  	console.log('sent: %s', message);
	  }
	  
	});
});