'use strict';

/* App Module */

var app = angular.module('goldBuying', ['goldFilters','ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      //Removed temporarily while focusing on single meeting principle.
      when('/home', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      otherwise({redirectTo: '/home'});
}]);
