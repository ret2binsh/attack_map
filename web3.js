var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d3   = require('d3');
var fs = require('fs');
var Syslogd = require('syslogd')

app.use(express.static('public'));

////Public IP Addresses are all in range 0.0.0.0 to 255.255.255.255 except private ip addresses.
// Regular Expression - ^(([0,1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.){3}([0,1]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$

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

		
	//	regex
		
	//	var regip = /(\w*[.]\w*[.]\w*[.]\w*)/.exec(message);
	//	console.log(regip[1]);
		//console.log("Found IP " + regip.input);
		
		//message = regip[1]
		
		//regex end
		
		
			
		//geolocate
		
		var request = require("request")

		var url = "http://api.ipinfodb.com/v3/ip-city/?key=6309d1e54af3ac465122d736a678351f56670c4e666a6345f8b88eaed8e315cb&ip=" + message +  "&format=json"
		//console.log (url);
		
		request({
		url: url,
		json: true
	}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       // console.log(body) // Print the json response
		
		var iplatitude = body.latitude
		var iplongitude = body.longitude
		
		//build an arc array
		
		var ipdestination = {origin: {latitude: +iplatitude, longitude: +iplongitude}, destination: {
                latitude: 37.6688,
                longitude: -122.0808 }, options: {strokeWidth:3 , strokeColor: 'rgba(255, 0, 0, 0.4)', greatArc: true, animationSpeed: 600}}
		
		//console.log(ipdestination)
		io.emit('message', {'message': body, for: 'everyone'});

		
		
		
    }
})
		
				
		//endgeolocat
		
       // console.log(parsedMessage.host)
    });
});




server.on("listening", function() {
    var address = server.address();
    console.log("Server now listening at " + 
        address.address + ":" + address.port);
});

server.bind(514); // Remember ports < 1024 need suid


http.listen(3000);








