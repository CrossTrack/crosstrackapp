'use strict';

angular.module('activ8')

.controller('HistoryController', function(Auth, $firebase){

  var ref = new Firebase("https://activ8.firebaseio.com/workouts/" + Auth.getUser().uid)

  var sync = $firebase(ref)

  this.historyList = sync.$asArray();

  console.log(Auth.getUser().uid)
});
