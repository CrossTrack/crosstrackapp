'use strict';

angular.module('activ8')

.controller('PRController', function(Auth, $firebase){
  var user =  Auth.getUser().uid
  var ref = new Firebase("https://activ8.firebaseio.com/userPR/" + user).orderByKey();

  var sync = $firebase(ref).$asArray();
  this.prList = sync;


  //Posting Workouts to the Workout Array
  this.pr = [ ];

  this.addMove = function(){
    this.pr.push({
      name: "",
      weight: "",
      date: Date.now()
    });
  };
  //Delete Movement from a workout
  this.delete = function(move) {
    var index = this.pr.indexOf(move)
    this.pr.splice(index, 1);
  }

  // Utilize the Date for titles?
  this.date = Date.now();
  var sync = $firebase(ref)

  this.newPR = sync.$asArray();
  this.addWork = function(best){
    this.newPR.$add(best);
    this.pr = [ ];
  }


});
