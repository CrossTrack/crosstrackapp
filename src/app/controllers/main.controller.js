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

    /**
    * Create a reference to the users collection within Firebase
    * Then create a child of the users collection named after the
    * authdUser's Facebook ID
    */
    var user = Firebase.child('users').child(authdUser.facebook.id);

    // Update the authdUser's information in Firebase
    user.update({
      uid: authdUser.facebook.id,
      facebook: authdUser.facebook,
      fullName: authdUser.facebook.displayName,
      avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
      gender: authdUser.facebook.cachedUserProfile.gender
    });

    // Set user to the object reference of authdUser
    user = $firebase(Firebase
      .child('users')
      .child(authdUser.facebook.id)
    ).$asObject();

    //Populate PR object
    var userPRs = Firebase.child('users').child(authdUser.facebook.id).child('pr')//.child(movement.name);
    userPRs.update({
      'Power Clean': {weight: 205},
      'Squat Clean': {weight: 195},
      'Hang Power Clean': {weight: 165},
      'Hang Squat Clean': {weight: 195},
      'Jerk': {weight: 205},
      'Split Jerk': {weight: 235},
      'Push Jerk': {weight: 215},
      'Clean & Jerk': {weight: 195},
      'Power Snatch': {weight: 355},
      'Squat Snatch': {weight: 385}
    })

    //stores the user information for use elsewhere
    currentUser = user;

    return user;
   }
  }) // END updateUser
//   function updateUser(authdUser){
//     if ( authdUser === null ){
//       return null;
//     }
//
//     var user = $firebase(Firebase
//       .child('users')
//       .child(authdUser.facebook.id)
//     ).$asObject();
//
//     angular.extend(user, {
//       uid: authdUser.facebook.id,
//       facebook: authdUser.facebook,
//       fullName: authdUser.facebook.displayName,
//       avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url,
//       gender: authdUser.facebook.cachedUserProfile.gender
//     });
//
//     user.$save();
//
//     currentUser = user;
//
//     return user;
//   } // END updateUser
// }) // END factory(Auth)

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

  this.chevron = function(){
    if($location.path() === "/" || $location.path() === "/login"){
      return false;
    }
    else {
      return true;
    }
  }


});
