'use strict';
/* global Firebase */

angular.module('activ8')
/**
* Root Firebase reference instance shared between all Services
*/
.factory('Firebase', function(CONFIG){
  return new Firebase(CONFIG.Firebase.baseUrl);
})

/**
* Auth(entication) Service
*
* @method {Promise} login
* @method {undefined} logout
* @method {undefined} onAuth
*
* @TODO: make onAuth return a Promise?
*/
.factory('Auth', function(Firebase, $firebaseAuth, $firebase){
  var auth = $firebaseAuth(Firebase);
  var currentUser = {};

  return {
    /**
    * Wrapper for `$firebaseAuth.$onAuth()` that filters the `auth` object
    * through the `updateUser()` function
    */
    onAuth: function(cb){
      auth.$onAuth(function(data){
        cb(updateUser(data));
      });
    },
    /**
    * Wrapper for `$firebaseAuth.$authWithOAuthPopup()` that invokes the
    * correct provider code.
    */
    login: function($location){
      return auth.$authWithOAuthRedirect('facebook')
    },

    loggedIn: function(){
      if(auth.$getAuth()){
        return true;
      }
    },
    /**
    * Wrapper for `$firebaseAuth.$unauth()`
    */
    logout: function($location){
      auth.$unauth();
    },
    /**
    *Get the current user.
    */
    getUser: function(){
      return currentUser;
    }
  }; // END service

  /**
  * Tranform the `authdUser` object from `$firebaseAuth` into a full User
  * record in the `/users` collection.
  *
  * @param {Object} authdUser from $firebaseAuth.getAuth()
  * @return {Object} from $firebase.$asObject()
  */
  function updateUser(authdUser){
    if ( authdUser === null ){
      return null;
    }

    var user = $firebase(Firebase
      .child('users')
      .child(authdUser.facebook.id)
    ).$asObject();

    angular.extend(user, {
      uid: authdUser.facebook.id,
      facebook: authdUser.facebook,
      fullName: authdUser.facebook.displayName,
      avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
      gender: authdUser.facebook.cachedUserProfile.gender
    });

    user.$save();

    currentUser = user;

    return user;
  } // END updateUser
}) // END factory(Auth)

// .factory("History", function(Auth, $firebase) {
//   return function() {
//     // create a reference to the user's profile
//     var ref = new Firebase("https://activ8.firebaseio.com/workouts/" + Auth.getUser().uid).orderBy("timestamp").limitToLast(3);
//     // return it as a synchronized object
//     return $firebase(ref).$asObject();
//   }
// })

/**
* Main application Controller
*
* @method {Promise} login -- trigger the login workflow
* @method {undefined} logout -- trigger the logout workflow
*/
.controller('MainController', function(Auth, $location){
  var self = this;

  this.login = Auth.login;

  this.logout = Auth.logout;

  Auth.onAuth(function(user){
    self.user = user;
    if (user === null ){
      return $location.path('/login')
    }
    else {
      return $location.path('/')
    }
  });

  this.loggedIn = Auth.loggedIn;


});
