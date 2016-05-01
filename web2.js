var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d3   = require('d3');
var fs = require('fs');

app.use(express.static('public'));


//var fbdestination = "destination: {latitude: 37.636519, longitude: -122.120506}"
//var dests = new Array ();
//console.log(fbdestination);
var fbdestination = [{origin: {latitude: 38.895111,longitude: -77.036667}, destination: {
                latitude: 32.066667,
                longitude: 34.783333 }, options: {strokeWidth:3 , strokeColor: 'rgba(255, 0, 0, 0.4)', greatArc: true, animationSpeed: 600}}]



io.on('connection', function(socket){
  console.log('a user connected');
 io.emit('message', {'message': fbdestination, for: 'everyone'});

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(3000);

var file = fs.readFile('./data.csv', 'utf8', function (err, data) {
  d3.csv.parse(data);
});

console.log (file);






