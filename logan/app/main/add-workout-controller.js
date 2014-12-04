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

  this.moveList = {};
  this.moveList.movements = movements;

   this.addMove = function(){
    $('.new-moves').append('<input type="text" data-ng-model="moveList.movements.name" list="movename">')
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
