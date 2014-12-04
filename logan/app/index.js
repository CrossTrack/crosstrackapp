'use strict';

angular.module('activ8', 'newWorkout', ['firebase'])
/**
* Global Configuration Object
*
* @TODO: Use https://github.com/guzart/gulp-ng-constant instead?
*/
.constant('CONFIG', {
  Firebase: {
    baseUrl: 'https://activ8.firebaseio.com'
  }
})
// 'use strict';
//
// angular.module('activ8', ['firebase'])
//   .constant('CONFIG', {
//     Firebase: {
//       baseUrl: 'https://activ8.firebaseio.com/'
//     }
//   })
  // .controller('MainController', ['$firebase',function(){
  //   var ref = new Firebase('https://activ8.firebaseio.com/'),
//    var users = new Firebase('https://activ8.firebaseio.com/users');
  //   authdUser = ref.getAuth(),
  //   self = this;
  //
  //   this.login = function(){
  //     ref.authWithOAuthPopup('facebook', function(error, authData){
  //       console.log("Logged in as: ", authData.facebook.displayName);
  //     })
  //     // console.log(ref.getAuth())
      // users.child(authdUser.uid).set({
      //   uid: authdUser.uid,
      //   facebook: authdUser.facebook,
      //   full_name: authdUser.facebook.displayName,
      //   avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url
      // });
  //
  //   }
  //
  //   this.loggedIn = function(){
  //     if(ref.getAuth() != null){
  //       return true;
  //     }
  //   };
  //   this._loggedIn = function(){
  //     console.log("made it")
  //     console.log(ref.getAuth())
  //     if(ref.getAuth() != null){
  //       return true;
  //     }
  //   };
  //
  //   this.logOut = function(){
  //     ref.unauth();
  //     console.log("You Have Signed Out");
  //   }
  //
  // }
  // ]);


  //
  //   $scope.login = function(){
  //     console.log(fbAuth)
  //     fbAuth.$authWithOAuthPopup("facebook").then(function(authData){
  //       self.displayName = authData.facebook.displayName;
  //       self.profilePic = authData.facebook.cachedUserProfile.picture.data.url;
  //       console.log("Logged in as: ", authData.facebook.displayName);
  //     }).catch(function(error){
  //       console.log("Authentication failed: ", error);
  //     });
  //   }
  //
  //   $scope.loggedIn = function(){
  //     if(fbAuth.$getAuth() != null){
  //       return true;
  //     }
  //   }
  //
  //   $scope.logOut = function(){
  //     fbAuth.$unauth();
  //     window.location.reload()
  //   }
  //
  //   var movesAdded = [ ];
