'use strict';

angular.module('activ8', [])
  .controller('MainController', function(){
    var ref = new Firebase('https://activ8.firebaseio.com/'),
    users = new Firebase('https://activ8.firebaseio.com/users'),
    authdUser = ref.getAuth(),
    self = this;

    this.login = function(){
      ref.authWithOAuthPopup('facebook', function(error, authData){
        console.log("Logged in as: ", authData.facebook.displayName);
      })
      users.child(authdUser.uid).set({
        uid: authdUser.uid,
        facebook: authdUser.facebook,
        full_name: authdUser.facebook.displayName,
        avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url
      });
      // users.once('value', function(snapshot) {
      //   snapshot.childExists(authdUser.uid, function(exists) {
      //     console.log('user exists');
      //   });
      // });
    }

    this.loggedIn = function(){
     if(ref.getAuth() != null){
       return true;
     }
    };

    this.logOut = function(){
      ref.unauth();
      console.log("You Have Signed Out");
    }

  });
