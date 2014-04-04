'use strict';

/* Controllers */
function MeetingListCtrl($scope, socket){
    socket.connect();
    socket.on('meetings:update', function(meetings){
       $scope.meetings = meetings.meetings;
    });
    $scope.leave = function(){
        socket.emit('unsubscribe');
    }
}

function HomeCtrl($scope, $location, socket, timerService) {
    socket.connect();
    $scope.goldOunces = {}
    $scope.goldOunces.total = 0.00;
    $scope.goldOunces.compute = function(){
        this.total = this.quantity * $scope.pricePerOunce;
    };
    
    $scope.goldBars = {};
    $scope.goldBars.total = 0.00;
    $scope.goldBars.compute = function(){
        this.total = this.quantity * 10 * $scope.pricePerOunce;
        this.pricePerBar = $scope.pricePerOunce * 10;
    };
    
    $scope.$watch('goldOunces', function(){
        $scope.goldOunces.compute();
        $scope.cart.compute();
    }, true);
    
    $scope.$watch('goldBars', function(){
        $scope.goldBars.compute();        
        $scope.cart.compute();
    }, true);
    
    $scope.$watch('pricePerOunce', function(){
        $scope.goldOunces.compute();
        $scope.goldBars.compute();
        $scope.cart.compute();
    });
    
    $scope.cart = [];
    $scope.cart.push($scope.goldBars);
    $scope.cart.push($scope.goldOunces);
    $scope.cart.total = 0.00;
    $scope.cart.compute = function(){
        var sum = 0;
        for(var i = 0; i < $scope.cart.length; i++){
            sum += $scope.cart[i].total || 0.0;
        }
        this.total = sum;
    }
    
    socket.on('updatePrice', function(data){
        if($scope.timer.expired){
            $scope.pricePerOunce = data.price;
        }
    });
    
    $scope.duration = moment.duration(0);
    $scope.timer = timerService($scope);
    $scope.start = function(){
        $scope.timer.start();
//        $scope.timer.start(20000);
    };
    
    $scope.stop = function(){
        $scope.timer.stop();
    }
}
