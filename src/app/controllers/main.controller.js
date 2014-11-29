'use strict';
/*global Firebase */

app.controller('MainCtrl', function ($scope, $firebase) {
    // var ref = new Firebase('https://crosstrack.firebaseio.com/');

    $scope.login = function authenticate(e) {
        var ref = new Firebase('https://crosstrack.firebaseio.com/');
        var uid = null;
        var username = null;

        ref.authWithOAuthPopup('github', function(error, user) {
          console.log(user);
          uid = user.uid;
          username = user.github.username;

          if (error) {
            console.log('Login Failed!', error);
          } else {
            console.log('Login Succeeded!', user);
          }

          console.log('User logged in with id: ', uid);
          console.log('username: ', username);

        }, {
            remember: "sessionOnly",
            scope: "user,gist"
          }


        );
    };


  });


