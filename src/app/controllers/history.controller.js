'use strict';

angular.module('activ8')

.controller('HistoryController', function(Auth, $firebase){
  var ref = new Firebase("https://activ8.firebaseio.com/workouts/" + Auth.getUser().uid).orderByKey().limitToLast(3);

  var sync = $firebase(ref);

  var historyArray = sync.$asArray();

<<<<<<< HEAD
   this.historyList = historyArray
=======
  this.historyList = historyArray
>>>>>>> aa41474ff553f806e135f44c0180568f8cf0d696



});
