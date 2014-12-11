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

.config(['$routeProvider', function($routeProvider, $firebase, $firebaseAuth) {
  $routeProvider
    .when ('/login', {
      templateUrl: 'app/views/login.html'
    })
    .when('/', {
        templateUrl: 'app/views/main.html'
    })
     .when('/new-workout', {
        templateUrl: 'app/views/new-workout.html',
        controller:  'NewWorkoutController',
        controllerAs: 'work',
    })
      .when('/history', {
        templateUrl: 'app/views/history.html',
        controller:  'HistoryController',
        controllerAs: 'history',
      })
      .when('/pr', {
        templateUrl: 'app/views/pr.html',
      })
     .otherwise({
        redirectTo: '/'
      });
}]);
