// create web server
var express = require('express');
var app = express();
// create server
var server = require('http').createServer(app);
// create socket.io instance
var io = require('socket.io')(server);
// create redis client
var redis = require('redis');
var client = redis.createClient();
// redis database number
var db = 0;
// set redis database
client.select(db);
// port
var port = 8081;
// set directory for static files
app.use(express.static(__dirname + '/public'));
// start server
server.listen(port, function() {
  console.log('Server listening on port %d', port);
});
// socket.io events
io.on('connection', function(socket){
  // new comment event
  socket.on('new comment', function(data){
    // add comment to redis list
    client.lpush('comments', JSON.stringify(data), function(err, reply) {
      // emit comment to all clients
      io.emit('new comment', data);
    });
  });
  // get comments event
  socket.on('get comments', function(data){
    // get all comments from redis list
    client.lrange('comments', 0, -1, function(err, reply) {
      // emit comments to all clients
      reply.forEach(function(comment) {
        io.emit('new comment', JSON.parse(comment));
      });
    });
  });
});
