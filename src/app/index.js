'use strict';
/*global Firebase */

var app = angular.module('crosstrack',
  ['firebase', 'appControllers', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngResource', 'ngRoute']);

var appControllers = angular.module('appControllers', ['firebase']);

// let's create a re-usable factory that generates the $firebaseAuth instance
app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://crosstrack.firebaseio.com/");
  return $firebaseAuth(ref);
}]);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'app/views/main.html',
      controller:  'MainCtrl',
      resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $waitForAuth returns a promise so the resolve waits for it to complete
        return Auth.$waitForAuth();
      }]
    }
    }).
    when('/dashboard', {
      templateUrl: 'app/views/dashboard.html',
      controller:  'DashboardCtrl',
      resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth", function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireAuth();
      }]
    }
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