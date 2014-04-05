var seats = function(){
    var newSeats = [];
    for(var i = 0; i < 5; i++){
        newSeats[i] = [];
        for(var j = 0; j < (i+1) * 2; j++){
            newSeats[i][j] = {
                id: {
                    row: i,
                    seat: j
                },
                available: true,
                consideration: 0
            };
        }
    }
    
    return newSeats;
}();

var users = [];
var socket = function (socket) {
    var user = {
      id: socket.id,
      confusion: 1
    };
    
    socket.on('init', function(){
        users.push(user);
        user.index = users.indexOf(user);
        socket.emit('init', {
            user: user,
            seats: seats
        });
        
        socket.broadcast.emit('user:add', {
            users: users
        });
    });
    
    socket.on('init:admin', function(){
        socket.emit('init:admin', {
            users: users,
            seats: seats
        });
    });
    
    var switchSeats = function(){
        var row = Math.floor(5 * Math.random());
        var seat = seats[row][Math.floor((row * 5) * Math.random())];
        if(seat) {seat.available = !seat.available;}
        socket.emit('seat:update', {
            seats: seats
        });
        
        setTimeout(switchSeats, 10000);
    };
    
    switchSeats();

    socket.on('seat:considered', function(data){
        seats[data.id.row][data.id.seat].consideration++;
        socket.broadcast.emit('seat:considered', {
            seats: seats
        });
    });

    socket.on('mouse:moved', function(){
        user.confusion++;
        socket.broadcast.emit('user:confused', {
            users: users
        })
    });
    
    socket.on('disconnect', function(){
        users.some(function(currentUser, index){
            if(currentUser.id == user.id){
                users.splice(index, 1);
                return true;
            } 
            return false;
        });
        socket.broadcast.emit('user:update', {
            users: users
        });
    });
      
};

module.exports = socket;

