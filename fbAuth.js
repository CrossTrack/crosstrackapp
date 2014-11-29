//
// var activApp = angular.module("activApp", ["firebase"]);
//   activApp.controller('fbAuth', ['$scope', '$firebase',

  var ref = new Firebase("https://activ8.firebaseio.com");

  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
    // ref.onAuth(function(authData) {
      if (error) {
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        console.log("User ID: " + user.uid + ", Provider: " + user.provider);
      } else {
        // user is logged out
        console.log("Not logged in!");
      }
    // });
  });

  $(function(){
    $("#fBlogin").click(function(){
      auth.login('facebook', {
        rememberMe: true
      });
    });
  });


// angular.module('activ8', ['firebase'])
//   .controller('MainController', function($firebase, $firebaseAuth, $scope){
//     var fire = new Firebase('https://activ8.firebaseio.com/'),
//         sync = $firebase(fire),
//         fbAuth = $firebaseAuth(fire),
//   syncObject = sync.$asObject(),
//         self = this;
//
//
//     syncObject.$bindTo($scope, "data");
//     $scope.workouts = sync.$asArray();
//
//     var actObj = $firebase(fire).$asObject();
//
//     $scope.login = function(){
//       console.log(fbAuth)
//       fbAuth.$authWithOAuthPopup("facebook").then(function(authData){
//         console.log("Logged in as: ", authData.facebook.displayName);
//         self.displayName = authData.facebook.displayName;
//         self.profilePic = authData.facebook.cachedUserProfile.picture.data.url;
//       }).catch(function(error){
//         console.log("Authentication failed: ", error);
//       });
//     }
//
//     $scope.loggedIn = function(){
//       if(fbAuth.$getAuth() != null){
//         return true;
//       }
//     }
//
//     $scope.logOut = function(){
//       fbAuth.$unauth()
//       window.location.reload()
//     }
//
//     var movesAdded = [ ];
//   });
