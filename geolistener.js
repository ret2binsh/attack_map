var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d3   = require('d3');
var dgram  = require("dgram");
var server = dgram.createSocket("udp4");

//Read the api key from a separate file to protect against unauthorized use
const api_file = 'api_key.txt';
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream(api_file)
});

rl.on('line', function(line){
  var apikey = line;
  console.log('Your API Key is: ', apikey);
});

// rl.close();
/*
Need to close the readline stream but apikey is referencing the variable
stored by line. Will to pass by value to reference.
*/
//End of api key retrieval


app.use(express.static('public'));

//Function to get multiple regex matches into an array
function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}


//this starts the ball rolling when a message is received on 514 UDP

server.on("message", function(rawMessage) {

	//regex to find IP addresses
	var myRegEx = /(\d*[.]\d*[.]\d*[.]\d*)/g;
	var matches = getMatches(rawMessage, myRegEx, 1);

	console.log(matches);

//now do this for each match found...
for (i = 0; i < matches.length; i++) {

		if ( matches[i].substring(0,3) != "74." && matches[i].substring(0,6) != "66.120" && matches != null && matches[i] != "0.0.0.0" ) {

				//geolocate using the ipinfodb - this returns JSON with geocoordinates

				var request = require("request")

				var url = "http://api.ipinfodb.com/v3/ip-city/?key=" + apikey + "&ip=" + matches[i] +  "&format=json"
				//console.log (url);

				request({
					url: url,
					rejectUnauthorized: false,
					json: true
				}, function (error, response, body) {

						if (!error && response.statusCode === 200) {
							    //console.log(response) // Print the json response


								//Send it
								io.emit('message', {'message': body, for: 'everyone'});


						}
				})



		} else {console.log("nothing")};
}
  //  });
});




server.on("listening", function() {
    var address = server.address();
    console.log("UDP Server now listening at " +
        address.address + ":" + address.port);
});

server.bind(514); // Remember ports < 1024 need suid


http.listen(3000);
console.log("web server listening on port 3000")
