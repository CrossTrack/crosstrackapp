'use strict';

angular.module('activ8', ['firebase'])
  .controller('MainController', function($firebase, $firebaseAuth){
    var fire = new Firebase('https://activ8.firebaseio.com/'),
        sync = $firebase(fire),
        fbAuth = $firebaseAuth(fire),
        syncObject = sync.$asObject(),
        self = this;

    syncObject.$bindTo($scope, "data");
    $scope.workouts = sync.$asArray();

    var actObj = $firebase(fire).$asObject();

    var users = new Firebase('https://activ8.firebaseio.com/web/data/users/');

    // $scope.newUser = function(){
    //  fire.child('users').child(authData.uid).set(authData);
    // }

    $scope.login = function(){
      fbAuth.$authWithOAuthPopup("facebook").then(function(authData){
        console.log("Logged in as: ", authData.uid);
        self.uid = authData.uid;
        self.displayName = authData.facebook.displayName;
        self.profilePic = authData.facebook.cachedUserProfile.picture.data.url;
        // if(users.once('value', function(snapshot) {
        //   snapshot.childExists(self.uid, function(exists) {
        //     console.log('user exists');
        //   });
        // }));
      }).catch(function(error){
        console.log("Authentication failed: ", error);
      });
    }

    $scope.loggedIn = function(){
      if(fbAuth.$getAuth() != null){
        return true;
      }
    }

    $scope.logOut = function(){
      fbAuth.$unauth();
      window.location.reload()
    }

    var movesAdded = [ ];
  });
