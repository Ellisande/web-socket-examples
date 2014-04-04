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
    
    $scope.$watch('goldOunces.quantity', function(){
        $scope.goldOunces.compute()
    }, true);
    
    $scope.$watch('pricePerOunce', function(){
        $scope.goldOunces.compute();
    });
    
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
