'use strict';

var app = angular.module('crosstrack', ['firebase', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngResource', 'ngRoute'])

  // .constant('FIREBASE_URL', 'https://crosstrack.firebaseio.com/');
  app.config(function ($routeProvider) {
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
