'use strict';

angular.module('activ8')

.controller('HistoryController', function(Auth, $firebase){
  this.pageClass = 'page-history';
  var ref = new Firebase("https://activ8.firebaseio.com/workouts/" + Auth.getUser().uid).orderByKey().limitToLast(3);

  var sync = $firebase(ref)

  this.historyList = sync.$asArray();
  console.log(this.historyList)
  console.log(Auth.getUser().uid)
});
