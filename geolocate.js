var request = require("request")

var url = "http://api.ipinfodb.com/v3/ip-city/?key=6309d1e54af3ac465122d736a678351f56670c4e666a6345f8b88eaed8e315cb&ip=74.125.45.100&format=json"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    }
})



//http://api.ipinfodb.com/v3/ip-city/?key=6309d1e54af3ac465122d736a678351f56670c4e666a6345f8b88eaed8e315cb&ip=74.125.45.100&format=json
