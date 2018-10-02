var app = require('express')();
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redisAdapter = require('socket.io-redis');
var user1;
var user2;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.join('room1');
    io.in('room1').clients((err, clients) => {
  		if(clients.length == 0){
  			user1 = clients[0];
  		}
  		if(clients.length == 1){
  			user2 = clients[1];
  		}
	});

	socket.on('chat message', function(msg){
	   socket.emit('room1').emit('chat message', msg);
	   socket.to('room1').emit('chat message2', msg);
	});

	socket.on('annotation1', function(msg){
		socket.emit('annotation1', msg);
	});

	socket.on('annotation2', function(msg){
		socket.emit('annotation2', msg);
	});

	socket.on('card', function(){
	   socket.emit('room1').emit('card1');
	   socket.to('room1').emit('card2');
	 });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
