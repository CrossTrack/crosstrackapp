'use strict';

angular.module('activ8')

/**
*Personal Bests controller
*/
.controller('PRController', function(Auth){

  var self = this;

  Auth.onAuth(function(user){
    self.user = user;
  });
})
