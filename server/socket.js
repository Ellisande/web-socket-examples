var price = 100;

var socket = function (socket) {
    var lockInTime = 60000;
    var lockedInPrice;
    var lockedIn = false;
    var unlockTimeout = {};
    
    var onTimeout = function(){
        price = price + ((1 * Math.random()) - (1 * Math.random()));
        socket.emit('price:update', {
            price: price
        });
        
        if(lockedInPrice && price > (lockedInPrice + 5.0) && lockedIn){
            clearTimeout(unlockTimeout);
            lockedIn = false;
            socket.emit('price:unlock', {
                message: 'The price of gold has increased by more than $5 beyond the locked in rate. You will need to lock in a new rate.'
            });
        }
        
        setTimeout(onTimeout, 100);
    };
    
    setTimeout(onTimeout(), 100);
    
    socket.on('price:lock', function(data){
        lockedInPrice = data.lockedInPrice;
        lockedIn = true;
        socket.emit('price:lock', {
            duration: 30000
        });
        
        unlockTimeout = setTimeout(function(){
            socket.emit('price:unlock', {
                message: 'You have waited longer than 30 seconds and your locked in rate has expired. Please lock in a new rate to purchase.'
            });
            lockedIn = false;
        }, 30000);
    });
};

module.exports = socket;

