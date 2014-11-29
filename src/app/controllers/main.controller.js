'use strict';
/*global Firebase */

app.controller('MainCtrl', function ($scope, $firebase, Auth) {
  $scope.auth = Auth;
  $scope.user = $scope.auth.$getAuth();

  $scope.login = function authenticate(e) {
      var ref = new Firebase('https://crosstrack.firebaseio.com/');
      var uid = null;
      var username = null;

      ref.authWithOAuthPopup('github', function(error, authData) {
        uid = authData.uid;
        username = authData.github.username;

          if (error) {
            console.log('Login Failed!', error);
          } else {
            console.log('Login Succeeded!', authData);
          }

        console.log('User logged in with id: ', uid);
        console.log('username: ', username);

      },
      {
        remember: "sessionOnly",
        scope: "user,gist"
      }); // authWithOAuthPopup
  }; // login
}); // controller


