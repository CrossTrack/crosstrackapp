'use strict';

angular.module('crosstrack', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngResource', 'ngRoute'])
  // .constant('FIREBASE_URL', 'https://crosstrack.firebaseio.com/');
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
