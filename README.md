web-socket-examples
===================

This repo holds a couple web socket examples created for Desert Code Camp 2014.1.

The master branch is simple a skeleton that each of the examples was built off.

## Gold Buying

An application for buying gold in various quanities. Its live-updates the client with the current price of gold, which in this examples changes every 300 miliseconds.

The gold buying branch demonstrates a "streaming" approach from the server of a continously changing gold price. It also shows how to have the server control and interactive component, the timer.

### Setup

* Clone the repo ```git clone http://github.com/Ellisande/web-socket-examples```
* Switch to the gold-buying branch ```git checkout gold-buying```

## Booking

An application for booking tickets for seats at a specific venue. The seating chart is updated live by the server as seats are reserved or freed up.

The booking branch demonstrates a more "realistic" server push event for updating seats. Additionally it makes use of web sockets to do some wicked-cool 
