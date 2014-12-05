'use strict';

angular.module('activ8')

.controller('WorkoutController', function(){
  var self = this,
  movements = [
   {
      name: "Pull Ups",
      type: 1
    },
    {
      name: "Push Ups",
      reps: 1,
      rds: 1
    },
    {
      name: "Handstand Push Ups",
      reps: 1,
      rds: 1
    },
    {
      name: "Sit Ups",
      reps: 1,
      rds: 1
    },
    {
      name: "GHD Sit Ups",
      reps: 1,
      rds: 1
    },
    {
      name: "Power Clean",
      reps: 1,
      type: 2
    },
    {
      name: "Squat Clean",
      reps: 1,
      rds: 1,
      weight: 0
    },
    {
      name: "Hang Power Clean",
      reps: 1,
      rds: 1,
      weight: 0
    },
    {
      name: "Hang Squat Clean",
      reps: 1,
      rds: 1,
      weight: 0
    },
  ];

  this.moveList = {};
  this.moveList.movements = movements;
  
  this.repsRounds = function(){
    if($('select').val() < 5){
      return true;
    }
  }
  this.weighted = function(){
    if($('select').val() >= 5){
      return true;
    }
  }

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
})


// <form>
// <div>
// <label>title</label>
// <input type="text" data-ng-model="item.title" list="comicstitle">
// </div>
// <div>
// <input type="Button" value="Add" data-ng-click="addItem(item)">
// </div>
// </form>
// </div>
// <datalist id="comicstitle">
// <option  data-ng-repeat="ttl in titles" value="{{ttl}}">
// </datalist>
