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

  // console.log(self.user);
  //
  // self.user.$child('pr').set({
  //   'Squat Snatch': '195',
  //   'Power Clean': 255
  // });

});

  /**
  * Clean - Jerk - Snatch
  *values in ng-options
  */
  // var personalRecords = [
  //  'Power Clean',
  //  'Squat Clean',
  //  'Hang Power Clean',
  //  'Hang Squat Clean',
  //  'Jerk',
  //  'Split Jerk',
  //  'Push Jerk',
  //  'Clean & Jerk',
  //  'Power Snatch',
  //  'Squat Snatch'
  // ];


  /**
  *Returns Personal Best for selected movement
  */
  // this.viewPr = function(selectedPr){
  //   return Math.max.apply(null, selectedPr);
  // }
