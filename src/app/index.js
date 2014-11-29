'use strict';

var app = angular.module('crosstrack',
  ['firebase', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngResource', 'ngRoute']);

var appControllers = angular.module('appControllers', ['firebase']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'app/main/main.html',
      controller:  'MainCtrl'
    }).
    when('/dashboard', {
      templateUrl: 'app/views/dashboard.html',
      controller:  'DashboardCtrl'
    }).
    when('/new-workout', {
      templateUrl: 'app/views/new-workout.html',
      controller:  'NewWorkoutCtrl'
    }).
    when('/history', {
      templateUrl: 'app/views/history.html',
      controller:  'HistoryCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);