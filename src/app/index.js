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
