
This project is based on the pewpew attack map project: https://github.com/hrbrmstr/pewpew

I liked it so much, but really wanted to see my own live data on there. I saw that they had added some custom support for MHN honeypot through some web sockets.  I decided to learn a little node.js and built a little node app hosts the web page and has a listener that listens on UDP 514 for any incoming messages, looks for IP addresses in the message, does a quick ip-geo lookup, and passes the coordinates to the web page, where your browser draws the arcs. The I figured you can configure anything you want to forward syslog messages to port 514.  Its still a little buggy, but works for the most part.

For this project, since all the destinations were at my datacenter, the destination is the same for every hit. You can adjust that at the top of geolistener.js.
You will also need to get a free API key from http://www.ipinfodb.com/. Make sure to throttle your source so you don't overload their servers and go over the free limit.  A goof future enhancement would be buffering of input requests and caching of results. Place this at the top of geolistener.js also.

The required node modules are:
d3, 
express, 
socket.io, 
