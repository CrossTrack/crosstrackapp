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
  var powerClean = [205, 185, 225, 295];

  this.test = function(){
    console.log(squatClean);
    console.log(powerClean);
    console.log("Squat Clean");
    console.log(self.viewPr(squatClean));
    console.log("Power Clean");
    console.log(self.viewPr(powerClean));
  }

  this.testPr = function(){
    console.log(auth.user.facebook.displayName);
  }

  /**
  *Returns Personal Best for selected movement
  */
  this.viewPr = function(selectedPr){
    return Math.max.apply(null, selectedPr);
  }

});
