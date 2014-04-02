
var socket = function (socket) {

      // join a room.
      socket.on('subscribe', function(data){
        socket.join(data.name);
        roomName = data.name;
        initialize(data.name);
      });
};

module.exports = socket;

