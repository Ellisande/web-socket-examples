
var socket = function (socket) {
    var price = 100;
    var lockInTime = 60000;
    
    var onTimeout = function(){
        price = price + ((1 * Math.random()) - (1 * Math.random()));
        socket.emit('updatePrice', {
            price: price
        });
        
        setTimeout(onTimeout, 100);
    };
    
    setTimeout(onTimeout(), 100);
    

    socket.on('timer:start', function(){
        socket.emit('timer:start', {
            duration: 30000
        });
        
        setTimeout(function(){socket.emit('timer:stop', {})}, 30000);
    });
};

module.exports = socket;

