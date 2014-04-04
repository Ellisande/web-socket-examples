'use strict';

angular.module('directives', ['services']).
directive('snoop', function(socket){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
            elem.bind('mouseover', function(){
                socket.emit('seat:considered', {
                    id: scope.seat.id
                });
            });
        }
    }
});