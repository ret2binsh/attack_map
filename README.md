This project is based on the pewpew attack map project: https://github.com/hrbrmstr/pewpew

I liked it so much, but really wanted to see my own live data on there. I saw that they had added some custom support for MHN honeypot through some web sockets. I decided to learn a little node.js and built a little node app hosts the web page and has a listener that listens on UDP 514 for any incoming messages, looks for IP addresses in the message, does a quick ip-geo lookup, and passes the coordinates to the web page, where your browser draws the arcs. The I figured you can configure anything you want to forward syslog messages to port 514. Its still a little buggy, but works for the most part.

For this project, since all the destinations were at my datacenter, the destination is the same for every hit. You can adjust that at the top of geolistener.js. You will also need to get a free API key from http://www.ipinfodb.com/. Make sure to throttle your source so you don't overload their servers and go over the free limit. A good future enhancement would be buffering of input requests and caching of results. Place this at the top of geolistener.js also.

to get it started:

node geolistener.js

This will start a webserver on port 3000, which servers up the index.html located in public. It also starts the syslog listener on port 514. Make sure your firewall allows inbound UDP to 514, and if you have any local firewall running on your node server, you'll need to allow it to listen on 3000.

You can check mine out here: http://gamehenge.duckdns.org:3000

The required node modules are: d3, express, socket.io, request

In the test folder, there's a Powershell script you can use which will parse a CSV file and send the IP's to your listener.

Otherwise you can test with netcat like this:

echo -n "8.8.8.8"|nc -4u -w1 127.0.0.1 514
