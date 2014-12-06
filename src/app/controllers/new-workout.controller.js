'use strict';
/* global Firebase */

angular.module('activ8')

.controller('WorkoutController', function(){
  var ref = new Firebase('https://activ8.firebaseio.com/users/facebook%3A10153339607144746'),
  self = this,
  movements = [
   {
      name: 'Pull Ups',
      type: 1
    },
    {
      name: 'Push Ups',
      reps: 1,
      rds: 1
    },
    {
      name: 'Handstand Push Ups',
      reps: 1,
      rds: 1
    },
    {
      name: 'Sit Ups',
      reps: 1,
      rds: 1
    },
    {
      name: 'GHD Sit Ups',
      reps: 1,
      rds: 1
    },
    {
      name: 'Power Clean',
      reps: 1,
      type: 2
    },
    {
      name: 'Squat Clean',
      reps: 1,
      rds: 1,
      weight: 0
    },
    {
      name: 'Hang Power Clean',
      reps: 1,
      rds: 1,
      weight: 0
    },
    {
      name: 'Hang Squat Clean',
      reps: 1,
      rds: 1,
      weight: 0
    },
  ];
  this.date = new Date();

  var userWorkouts = ref.child('workouts');

  userWorkouts.push({
    date:
  {
    Pull_Ups: {
      reps: 25,
      rds: 5
    },
    Push_Ups: {
      reps: 25,
      rds: 5
    },
    Sit_Ups: {
      reps: 25,
      rds: 5
    }
  }
  });

  this.moveList = {};
  this.moveList.movements = movements;

  this.repsRounds = function(){
    if($('select').val() < 5){
      return true;
    }
  };
  this.weighted = function(){
    if($('select').val() >= 5){
      return true;
    }
  };

   this.addMove = function(){
    $('.new-moves').append(
    '<select ng-model="selected" ng-options="moves.name for moves in work.moveList.movements">' +
    '<option value="">Select Movement</option>' +
    '</select><br>' +
    '<input type="text" ng-show="work.repsRounds() || work.weighted()" placeholder="Reps">' +
    '<input type="text" ng-show="work.repsRounds() || work.weighted()" placeholder="Rounds">' +
    '<input type="text" ng-show="work.weighted()" placeholder="Weight"><br>');
  };

  // this.addWorkout = function(){
  //   console.log("Hello")
  // }
});
