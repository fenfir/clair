var sys = require("sys"), ws = require('websocket-server'), net = require('net'), url = require('url');
var server = ws.createServer();

server.addListener('connection', function(connection) {
  var request = url.parse(connection._req.url, true);
  var socket = net.createConnection(request.query.port, request.query.host);
  socket.setEncoding('base64');
  socket.addListener('data', function(data) {
	connection.send(data);
	sys.log("receive: " + data);	
  });
  connection.addListener('message', function(message) {
	socket.write(message);	
	sys.log("send: " + message + " length: " + message.length);		
  });
  connection.addListener('close', function() {
	// socket.close();	
  });
}).listen(8000);