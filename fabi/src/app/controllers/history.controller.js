'use strict';
/*global Firebase */

app.controller('HistoryCtrl', ['$scope', '$firebase',
  function($scope, $firebase) {

    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object
    $scope.data = sync.$asObject();
  }
]);