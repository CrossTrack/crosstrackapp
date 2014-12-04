'use strict';

angular.module('activ8')

/**
*Personal Bests controller
*/
.controller('prCtrl', function(){

  var self = this;

  /**
  *values in ng-options
  */
  var personalRecords = [
   "Power Clean",
   "Squat Clean",
   "Hang Power Clean",
   "Hang Squat Clean",
   "Jerk",
   "Split Jerk",
   "Push Jerk",
   "Clean & Jerk",
   "Power Snatch",
   "Squat Snatch"
  ];

  var squatClean = [135, 95, 185, 155];

  this.test = function(){
    console.log(squatClean);
    console.log(self.personalBest(squatClean));
  }

  this.personalBest = function(prMovement){
    return Math.max(squatClean);
  }

});
