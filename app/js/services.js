'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
app
.factory('socket', function ($rootScope) {
  var socket;
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
    connect: function(){
      if(!socket){
          socket = io.connect('http://localhost:3000/');
      } else {
        //socket.socket.connect();
      }
    },
    disconnect: function(){
      socket.disconnect();
    }
  };
}). 
factory('timerService', function(socket, $timeout){
    return function($scope){
        $scope.duration = moment.duration(3, 'minutes');
        var currentTimeout = {};
        
        var startTimeout = function(timer){
            var onTimeout = function(){
                timer.expired = moment().isAfter(timer.endTime);
                if(timer.expired){
                    $scope.duration = moment.duration(3, 'minutes');
                } else {
                    $scope.duration = timer.currentDuration();
                    currentTimeout = $timeout(onTimeout,1000);
                }
            }
            currentTimeout = $timeout(onTimeout,1000);
        };
        
        var timer = {
            endTime: moment(),
            currentDuration: function(){
              return moment.duration(this.endTime.diff(moment()));  
            },
            start: function(duration){
                socket.emit('timer:start',{
                    duration:duration
                });
            },

            stop: function(){
                $scope.duration = moment.duration(3,'minutes');
                $timeout.cancel(currentTimeout);
                timer.expired = true;
                socket.emit('timer:stop',{});
            },

            expired: true
        };

        socket.on('timer:start', function(data){
            $timeout.cancel(currentTimeout);
            timer.endTime = moment().add(data.duration, 'milliseconds');
            startTimeout(timer);
            timer.expired = false;
        });

        socket.on('timer:stop', function(){
            if(!timer.expired){
                timer.stop()
            };
        });
        return timer;   
    };
});
