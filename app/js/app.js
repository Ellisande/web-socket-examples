'use strict';

/* App Module */

var app = angular.module('standup', ['standupFilters','ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      //Removed temporarily while focusing on single meeting principle.
      when('/home', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      otherwise({redirectTo: '/home'});
}]);
