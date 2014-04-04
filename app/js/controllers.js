'use strict';

function HomeCtrl($scope, $location, socket) {
    socket.connect();
    socket.emit('init', []);
    
    $scope.stealMouse = function(mousex, mousey){
        socket.emit('mouse:moved', {})
    };
    
    $scope.allSeats = [];
    
    
    socket.on('init', function(data){
        $scope.allSeats = data.seats;
    });
    
    socket.on('seat:update', function(data){
        $scope.allSeats = data.seats;
    });
    
    $scope.toggle = function(seat){
        if(seat.available){
            seat.selected = !seat.selected;
        }
    }
}

function AnalyticsCtrl($scope, socket){
    socket.connect();
    socket.emit('init:admin', {});
    $scope.seats = [];
    
    var flattenSeats = function(seats){
        var allSeats = [];
        seats.forEach(function(row){
            row.forEach(function(seat){
                allSeats.push(seat);
            });
        });

        return allSeats;
    };
    
    socket.on('init:admin', function(data){
        $scope.allUsers = data.users;
        $scope.seats = flattenSeats(data.seats);
    })
    
    socket.on('seat:considered', function(data){
        $scope.seats = flattenSeats(data.seats);
    });
    
    socket.on('user:add', function(data){
        $scope.allUsers = data.users;
    });    
    
    socket.on('user:update', function(data){
        $scope.allUsers = data.users;
    });
    
    socket.on('user:confused', function(data){
        $scope.allUsers = data.users;        
    });
}

