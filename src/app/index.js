'use strict';

angular.module('activ8', ['firebase', 'ngRoute'])
/**
* Global Configuration Object
*
* @TODO: Use https://github.com/guzart/gulp-ng-constant instead?
*/
.constant('CONFIG', {
  Firebase: {
    baseUrl: 'https://activ8.firebaseio.com'
  }
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'app/views/main.html',
      // controller:  'MainController'
    }).
    when('/new-workout', {
      templateUrl: 'app/views/new-workout.html',
      // controller:  'NewWorkoutCtrl'
    }).
    when('/personal-records', {
      templateUrl: 'app/views/personal-records.html',
      // controller:  'prController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);
