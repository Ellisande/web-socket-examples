'use strict';

/* App Module */

var app = angular.module('standup', ['standupFilters','ngRoute','directives','services']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      //Removed temporarily while focusing on single meeting principle.
      when('/home', {templateUrl: 'partials/home.html',   controller: HomeCtrl}).
      when('/analytics', {templateUrl: 'partials/analytics.html', controller: AnalyticsCtrl}).
      otherwise({redirectTo: '/home'});
}]);
