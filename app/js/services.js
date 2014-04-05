'use strict';

/* Services */


// Demonstrate how to register services
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
      }
    },
    disconnect: function(){
      socket.disconnect();
    }
  };
}). 
factory('priceLockService', function(socket, $timeout){
    return function($scope){
        $scope.duration = moment.duration(30, 'seconds');
        var currentTimeout = {};
        
        var startTimeout = function(timer){
            var onTimeout = function(){
                timer.expired = moment().isAfter(timer.endTime);
                if(timer.expired){
                    $scope.duration = moment.duration(30, 'seconds');
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
            lock: function(price){
                socket.emit('price:lock',
                    {
                        lockedInPrice: price
                    }
                );
            },

            unlock: function(){
                $scope.duration = moment.duration(30,'seconds');
                $timeout.cancel(currentTimeout);
                timer.expired = true;
                socket.emit('price:unlock',{});
            },
            buy: function(lockedInPrice){
                socket.emit('purchase', {
                    lockedInPrice: lockedInPrice
                });
            },
            expired: true
        };

        socket.on('price:lock', function(data){
            $timeout.cancel(currentTimeout);
            timer.endTime = moment().add(data.duration, 'milliseconds');
            startTimeout(timer);
            timer.expired = false;
        });

        socket.on('price:unlock', function(){
            timer.unlock()
        });
        
        
        return timer;   
    };
});
