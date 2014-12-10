'use strict';

angular.module('activ8')

/**
*Personal Bests controller
*/
.controller('prController', function(Auth, $firebase, CONFIG){

  var self = this;

  Auth.onAuth(function(user){
    self.user = user;
  });

});

  /**
  *Returns Personal Best for selected movement
  */
  // this.viewPr = function(selectedPr){
  //   return Math.max.apply(null, selectedPr);
  // }
