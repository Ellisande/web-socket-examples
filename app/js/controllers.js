'use strict';

function HomeCtrl($scope, $location, socket, priceLockService) {
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
    
    $scope.goldStatues = {};
    $scope.goldStatues.total = 0.00;
    $scope.goldStatues.compute = function(){
        this.total = this.quantity * 579 * $scope.pricePerOunce;
        this.pricePerStatue = $scope.pricePerOunce * 579;
    };
    
    $scope.$watch('goldOunces', function(){
        $scope.goldOunces.compute();
        $scope.cart.compute();
    }, true);
    
    $scope.$watch('goldBars', function(){
        $scope.goldBars.compute();        
        $scope.cart.compute();
    }, true);    
    
    $scope.$watch('goldStatues', function(){
        $scope.goldStatues.compute();        
        $scope.cart.compute();
    }, true);
    
    $scope.$watch('pricePerOunce', function(){
        $scope.goldOunces.compute();
        $scope.goldBars.compute();
        $scope.goldStatues.compute();
        $scope.cart.compute();
    });
    
    $scope.cart = [];
    $scope.cart.push($scope.goldBars);
    $scope.cart.push($scope.goldOunces);
    $scope.cart.push($scope.goldStatues);
    $scope.cart.total = 0.00;
    $scope.cart.compute = function(){
        var sum = 0;
        for(var i = 0; i < $scope.cart.length; i++){
            sum += $scope.cart[i].total || 0.0;
        }
        this.total = sum;
    }
    
    socket.on('price:update', function(data){
        if($scope.priceLockTimer.expired){
            $scope.pricePerOunce = data.price;
        }
    });
    
    socket.on('price:unlock', function(data){
        $scope.unlockMessage = data.message;
    });
    
    $scope.duration = moment.duration(0);
    $scope.priceLockTimer = priceLockService($scope);
    $scope.lockIn = function(){
        $scope.unlockMessage = undefined;
        $scope.priceLockTimer.lock($scope.pricePerOunce);
    };
    
    $scope.stop = function(){
        $scope.priceLockTimer.unlock();
    }
    
    $scope.purchase = function(){
        $scope.priceLockTimer.buy($scope.pricePerOunce);
    }
}
