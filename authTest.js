'use strict';
/*
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

*/



angular.module('activ8', ['firebase'])

  .factory('Auth', function(CONFIG, $firebase, $firebaseAuth){
    var ref = new Firebase(CONFIG.Firebase.baseUrl);
    var auth = $firebaseAuth(ref);
  })

  .factory('AuthdUser', function(CONFIG, $firebase){
    var ref = new Firebase(CONFIG.Firebase.baseUrl);
    var authdUser = reg.getAuth();

    var user = $firebase(ref
      .child('users')
      .child(authdUser.uid)
    ).$asObject();
  })

  .constant('CONFIG', {
      Firebase: {
        baseUrl: 'https://activ8.firebaseio.com'
      }
  })

  .controller('MainController', function($firebase, $firebaseAuth){
    var ref = new Firebase(CONFIG.Firebase.baseUrl);
    var auth = $firebaseAuth(ref);
    var users = new Firebase('https://activ8.firebaseio.com/users');

    auth.$onAuth(function(data){
      console.log("on auth spoiler");
    });

    return {
      onAuth: function(cb){
        auth.$onAuth(function(data){
          cb(getUser(data));
        });
      },
      login: function(){
        return auth.$authWithOAuthPopup('facebook')
      },
      logout: function(){
        auth.$unauth();
      }
    }

    function getUser(authdUser){
      var auth = ref.getAuth();
      if ( authdUser === null){
        return null;
      }

      return $firebase(ref
        .child('users')
        .child(authdUser.uid)
      ).$asObject();

      user.uid = authdUser.uid;
      user.facebook = authdUser.facebook;
      user.fullName = authdUser.facebook.displayName;
      user.avatarURL = authdUser.facebook.cachedUserProfile.picture.data.url;

    }

  });

  .controller('MainCtrl', function(Auth, AuthdUser){

    var self = this;

    Auth.onAuth(function(user){
        self.user = user;
    })

    this.login = Auth.login;

    this.logout = Auth.logout;
  });
