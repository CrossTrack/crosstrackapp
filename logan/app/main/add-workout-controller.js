'use strict';

angular.module('activ8')

.controller('WorkoutController', function(){
  var self = this,
  movements = [
    {
      name: "Pull Ups",
      reps: 1,
      rds: 1
    },
    {
      name: "Push Ups",
      reps: 1,
      rds: 1
    }
  ];

  this.moveData = {};
  this.moveData.movements = movements;

  // this.addWorkout = function(){
  //   console.log("Hello")
  // }
})
