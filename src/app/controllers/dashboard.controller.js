'use strict';
/*global Firebase */

app.controller('DashboardCtrl', ['$scope', '$firebase',
  function($scope, $firebase) {
    var ref = new Firebase('https://crosstrack.firebaseio.com/');

    // create an AngularFire reference to the data
    var sync = $firebase(ref);

    // download the data into a local object
    $scope.data = sync.$asObject();
  }
]);