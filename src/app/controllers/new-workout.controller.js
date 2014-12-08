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

  //Posting Workouts to the Workout Array
  this.workout = [ ];

  this.addMove = function(){
    this.workout.push({
      name: "",
      reps: "",
      rds: "",
      weight: "",
      moveNumber: this.workout.length + 1,
      date: Date.now()
    });
  };
  //Delete Movement from a workout
  this.delete = function(move) {
    var index = this.workout.indexOf(move)
    this.workout.splice(index, 1);
  }

  // Utilize the Date for titles?
  this.date = Date.now();
  var sync = $firebase(ref)

  this.newWorkout = sync.$asArray();
  this.addWork = function(workout){
    this.newWorkout.$add(workout);
    this.workout = [ ];
  }

  // ref.orderByKey().limitToLast(3).on("child_added", function(snapshot) {
  //   console.log(snapshot.key());
  // });
  this.moveList = {};
  this.moveList.movements = movements;

  //Working on displaying the right properties of each movement
  this.repsRounds = function(){
    if($('.naming1').val() === ""){
      return false;
    }
    else if($('.naming1').val()){
      return true;
    }
  }
  //Checking the Movement Value to display proper inputs
  this.weighted = function(){
  if($(".naming1").val().indexOf("Clean") > -1){
    return true;
  }
  // else if($(".naming1").val().indexOf("Snatch") > -1){
  //   return true;
  // }
  // else if($(".naming1").val().indexOf("Jerk") > -1){
  //   return true;
  // }
  // else if($(".naming1").val().indexOf("Press") > -1){
  //   return true;
  // }
  // else if($(".naming1").val().indexOf("Kettle") > -1){
  //   return true;
  // }
  // else if($(".naming1").val().indexOf("Dumbbell") > -1){
  //   return true;
  // }
  else {
    return false;
   }
  }

});//End Controller
