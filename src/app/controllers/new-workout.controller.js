'use strict';

angular.module('activ8')

<<<<<<< HEAD
.controller('WorkoutController', function(Auth){
  var ref = new Firebase("https://activ8.firebaseio.com/users/" + Auth.getUser().uid),
=======
.controller('WorkoutController', function(Auth, $firebase){
  var ref = new Firebase("https://activ8.firebaseio.com/workouts/" + Auth.getUser().uid),
>>>>>>> release/RELEASE
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

<<<<<<< HEAD

  console.log(movements["PullUps"].type)
  // Utilize the Date for titles?
  this.date = new Date();

  //Posting Workouts to the Workout Array
  this.workout = [ ];
  this.move = {name: " ", reps: " ", rds: " ", weight: " "};

  // this.postWorkout = function (){
  //   this.workout.push(this.move);
  //   this.move = {name: " ", reps: " ", rds: " ", weight: " "};
  //   console.log("Poo")
  // };


  var userWorkouts = ref.child('workouts')

  this.postWorkout = function(){
    userWorkouts.push({name: "hello"});
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
    '<input class="moving" ng-model="moving" type="text" list="moving" placeholder="Select Movement" autocomplete><br>' +
    '<input type="text" ng-model="move.reps" ng-show="work.repsRounds() || work.weighted()" placeholder="Reps"><br>' +
    '<input type="text" ng-model="move.rds" ng-show="work.repsRounds() || work.weighted()" placeholder="Rounds"><br>' +
    '<input type="text" ng-model="move.weight"ng-show="work.weighted()" placeholder="Weight"><br>');
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
=======
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
>>>>>>> release/RELEASE
