'use strict';

var app = angular.module('socket-chatting', ['ngRoute']).
config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/customer-representative', {
            templateUrl: '/partials/chatroom-rep.html',
            controller: 'AppCtrl'
    })
    .when('/customer', {
        templateUrl: '/partials/customer.html',
        controller: 'AppCtrl'
    });
});