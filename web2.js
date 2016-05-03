var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d3   = require('d3');
var fs = require('fs');
var Syslogd = require('syslogd')


app.use(express.static('public'));


//var fbdestination = "destination: {latitude: 37.636519, longitude: -122.120506}"
//var dests = new Array ();
//console.log(fbdestination);
var fbdestination = [{origin: {latitude: 38.895111,longitude: -77.036667}, destination: {
                latitude: 32.066667,
                longitude: 34.783333 }, options: {strokeWidth:3 , strokeColor: 'rgba(255, 0, 0, 0.4)', greatArc: true, animationSpeed: 600}}]


io.on('connection', function(socket){
  console.log('a user connected');
 socket.emit('message', {'message': fbdestination, for: 'everyone'});

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


var syslogParser = require('glossy').Parse; // or wherever your glossy libs are
var dgram  = require("dgram");
var server = dgram.createSocket("udp4");

server.on("message", function(rawMessage) {
    syslogParser.parse(rawMessage.toString('utf8', 0), function(parsedMessage){
        //console.log(parsedMessage.host + ' - ' + parsedMessage.message);
        console.log(parsedMessage.src)
        console.log(parsedMessage.host)
    });
});

server.on("listening", function() {
    var address = server.address();
    console.log("Server now listening at " + 
        address.address + ":" + address.port);
});

server.bind(514); // Remember ports < 1024 need suid


http.listen(3000);








