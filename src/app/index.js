'use strict';
/*global Firebase */

var app = angular.module('crosstrack',
  ['firebase', 'appControllers', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngResource', 'ngRoute']);

var appControllers = angular.module('appControllers', ['firebase']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'app/views/main.html',
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