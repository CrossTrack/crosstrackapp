'use strict';

angular.module('activ8')

.controller('HistoryController', function(Auth, $firebase){
  var ref = new Firebase("https://activ8.firebaseio.com/workouts/" + Auth.getUser().uid).orderByKey();

  var sync = $firebase(ref);

  var historyArray = sync.$asArray();

   this.historyList = historyArray



});
