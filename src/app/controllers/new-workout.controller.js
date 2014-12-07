'use strict';

angular.module('activ8')

.controller('WorkoutController', function(Auth, $firebase){
  var ref = new Firebase("https://activ8.firebaseio.com/workouts/" + Auth.getUser().uid),
  self = this,
  movements = {
   "PullUps": {
      name: "Pull Ups",
      type: 1
  },
    "PushUps": {
      name: "Push Ups",
      type: 1
  },
    "HandstandPushUps": {
    name: "Handstand Push Ups",
    type: 1
  },
    "SitUps": {
    name: "Sit Ups",
    type: 1
  },
    "GHDSitUps": {
    name: "GHD Sit Ups",
    type: 1
  },
    "PowerClean": {
    name: "Power Clean",
    type: 2
  },
    "SquatClean": {
    name: "Squat Clean",
    type: 2
  },
    "HangPowerClean": {
    name: "Hang Power Clean",
    type: 2
  },
    "HangSquatClean": {
    name: "Hang Squat Clean",
    type: 2
  }
  };
  this.workout = [ ];
  this.move = {name: " ", reps: " ", rds: " ", weight: " "};
  this.date = Date.now();
  var sync = $firebase(ref.child(Date.now()))

   this.newWorkout = sync.$asArray();
  this.addWork = function(user, move, move2) {
    this.newWorkout.$add(
      {
       user: Auth.getUser().uid,
       move1: move.name,
       move1reps: move.reps,
       move1rds: move.rds,
       move1weight: move.weight,
       move2: move2.name,
       move2reps: move2.reps,
       move2rds: move2.rds,
       move2weight: move2.weight

     });
  };


  console.log(movements["PullUps"].type)
  // Utilize the Date for titles?


  //Posting Workouts to the Workout Array



  // this.postWorkout = function (){
  //   this.workout.push(this.move);
  //   this.move = {name: " ", reps: " ", rds: " ", weight: " "};
  //   console.log("Poo")
  // };


  var userWorkouts = $firebase(ref.child('workouts').child(this.date.toString())).$asObject()

  this.postWorkout = function(move){
    userWorkouts.$push;
  };

  this.moveList = {};
  this.moveList.movements = movements;
  console.log(Auth.getUser())
  // (movements[($('.moving').val().replace(/ /g, ''))].type === 1)
  this.repsRounds = function(){
    if($('.moving').val() === ""){
      return false;
    }
    else if((movements[($('.moving').val().replace(/ /g, ''))].type === 1)){
      return true;
    }
  }
  this.weighted = function(){
  if($('.moving').val() === ""){
    return false;
  }
  else if((movements[($('.moving').val().replace(/ /g, ''))].type === 2)){
    return true;
  }
}

   this.addMove = function(){
    $('.new-moves').append(
    '<input class="moving" ng-model="move2.name" type="text" list="moving" placeholder="Select Movement" autocomplete><br>' +
    '<input type="text" ng-model="move2.reps" ng-show="work.repsRounds() || work.weighted()" placeholder="Reps"><br>' +
    '<input type="text" ng-model="move2.rds" ng-show="work.repsRounds() || work.weighted()" placeholder="Rounds"><br>' +
    '<input type="text" ng-model="move2.weight"ng-show="work.weighted()" placeholder="Weight"><br>');
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
