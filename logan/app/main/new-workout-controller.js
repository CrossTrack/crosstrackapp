'use strict';

angular.module('activ8')
/**
* Root Firebase reference instance shared between all Services
*/
.factory('Firebase', function(CONFIG){
  return new Firebase(CONFIG.Firebase.baseUrl);
})

/**
* Main application Controller
*
* @method {Promise} login -- trigger the login workflow
* @method {undefined} logout -- trigger the logout workflow
*/
.controller('NewWorkoutController', function(search){



});

