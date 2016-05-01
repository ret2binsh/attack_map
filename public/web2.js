var app = require('express')();
var server = require('http').createServer(app);


var io = require('socket.io')(server);
app.use(express.static('public'));

io.on('connection', function(){ /* … */ });
app.listen(3000);
