'use strict';

/* Filters */

angular.module('goldFilters', []).filter('timer', function(){
    return function(input){
      return input < 10 ? '0'+input : ''+input;  
    };
});
