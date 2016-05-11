var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d3   = require('d3');
var fs = require('fs');
var Syslogd = require('syslogd')

app.use(express.static('public'));



//   regex for nonpublic IP:    (^127.)|(^10.)|(^172.1[6-9].)|(^172.2[0-9].)|(^172.3[0-1].)|(^192.168.)


var syslogParser = require('glossy').Parse; // or wherever your glossy libs are
var dgram  = require("dgram");
var server = dgram.createSocket("udp4");

server.on("message", function(rawMessage) {
    syslogParser.parse(rawMessage.toString('utf8', 0), function(parsedMessage){
        //console.log(parsedMessage.host + ' - ' + parsedMessage.message);
     
		var message = parsedMessage.originalMessage
		var message = message.replace("IP ","")
		console.log(message);

		
			
		//geolocate
		
		var request = require("request")

		var url = "http://api.ipinfodb.com/v3/ip-city/?key=6309d1e54af3ac465122d736a678351f56670c4e666a6345f8b88eaed8e315cb&ip=" + message +  "&format=json"
		console.log (url);
		
		request({
		url: url,
		json: true
	}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
		
				var iplatitude = body.latitude
		var iplongitude = body.longitude
		
		//build an arc array
		
		var ipdestination = {origin: {latitude: +iplatitude, longitude: +iplongitude}, destination: {
                latitude: 37.6688,
                longitude: -122.0808 }, options: {strokeWidth:3 , strokeColor: 'rgba(255, 0, 0, 0.4)', greatArc: true, animationSpeed: 600}}
		
		console.log(ipdestination)
		io.emit('message', {'message': ipdestination, for: 'everyone'});

		
		
		
    }
})
		
				
		//endgeolocat
		
       // console.log(parsedMessage.host)
    });
});


/* io.on('connection', function(socket){
  //console.log('a user connected');
//socket.emit('message', {'message': ipdestination, for: 'everyone'});

socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
 */

server.on("listening", function() {
    var address = server.address();
    console.log("Server now listening at " + 
        address.address + ":" + address.port);
});

server.bind(514); // Remember ports < 1024 need suid


http.listen(3000);








