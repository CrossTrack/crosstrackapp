'use strict';

angular.module('activ8')

/**
*Personal Bests controller
*/
.controller('prController', function(Auth, $firebase){

  var ref = new Firebase("https://activ8.firebaseio.com/users/" + Auth.getUser().uid + "/pr");
  var sync = $firebase(ref);
  var prArray = sync.$asObject();
  this.prList = prArray;
  var self = this;

  this.test = function(){
    console.log("Test");
    console.log(Auth.getUser().fullName)
    console.log(this.prList.powerClean);
  }

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
