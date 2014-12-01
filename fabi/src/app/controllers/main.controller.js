'use strict';
/* global Firebase */

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}]);


app.controller('MainCtrl', function ($scope, $firebase, Auth) {
  $scope.auth = Auth;
  $scope.user = $scope.auth.$getAuth();
  $scope.login = function authenticate(e) {
      var ref = new Firebase('https://crosstrack.firebaseio.com');
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
        // new code
        // we would probably save a profile when we register new users on our site
        // we could also read the profile to see if it's null
        // here we will just simulate this with an isNewUser boolean
        var isNewUser = true;

        var ref = new Firebase("https://crosstrack.firebaseio.com");
        ref.onAuth(function(authData) {
          if (authData && isNewUser) {
            // save the user's profile into Firebase so we can list users,
            // use them in Security and Firebase Rules, and show profiles
            ref.child('users').child(authData.uid).set(authData);
          }
        }); //end new code

      },
      {
        remember: "sessionOnly",
        scope: "user,gist"
      }); // authWithOAuthPopup
  }; // login
}); // controller

// =========================================================
// create a User factory with a getFullName() method
app.factory("UserFactory", function($FirebaseObject) {
  return $FirebaseObject.$extendFactory({
      getFullName: function() {
        // concatenate first and last name
        return this.first_name + " " + this.last_name;
      }
   });
});

// create a User object from our Factory
app.factory("User", function($firebase, $FirebaseObject) {
  var ref = new Firebase('https://crosstrack.firebaseio.com'+"/users/");
  return function(userid) {
    return $firebase(ref.child(userid), {objectFactory: "UserFactory"}).$asObject();
  }
});
// =========================================================
