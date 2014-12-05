'use strict';

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
    login: function(){
      return auth.$authWithOAuthPopup('facebook');
    },

    loggedIn: function(){
      if(auth.$getAuth()){
      return true;
     }
   },
    /**
    * Wrapper for `$firebaseAuth.$unauth()`
    */
    logout: function(){
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
      .child(authdUser.uid)
    ).$asObject();

    angular.extend(user, {
      uid: authdUser.uid,
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

/**
* Main application Controller
*
* @method {Promise} login -- trigger the login workflow
* @method {undefined} logout -- trigger the logout workflow
*/
.controller('MainController', function(Auth){
  var self = this;

  this.login = Auth.login;

  this.logout = Auth.logout;

  Auth.onAuth(function(user){
    self.user = user;
  });

  this.loggedIn = Auth.loggedIn;
});
// 'use strict';
//
// angular.module('activ8')
//   .factory('Auth', function(CONFIG, $firebaseAuth, $firebase){
//     var ref = new Firebase(CONFIG.Firebase.baseUrl);
//
//     var auth = $firebaseAuth(ref);
//
//     auth.$onAuth(function(data){
//       getUser();
//     })
//
//     return {
//       onAuth: function(cb){
//         auth.$onAuth(function(data){
//           cb = (getUser(data))
//         });
//       },
//       login: function(){
//         return auth.$authWithOAuthPopup('facebook')
//       },
//       logout: function(){
//         auth.$unauth();
//       },
//       getUser: function(){
//         var auth = ref.getAuth();
//         return $firebase(ref).child('users').child(auth.uid).$asObject();
//       }
//     };
//     function getUser(authdUser){
//       if(authdUser === null){
//         return null
//       }
//
//       var auth = ref.getAuth();
//       return $firebase(ref).child('users').child(auth.uid).$asObject();
//     }
//   })
//   .factory('AuthdUser', function(CONFIG, $firebase, Auth){
//     var ref = new Firebase(CONFIG.Firebase.baseUrl);
//
//     var authdUser = ref.getAuth();
//
//     return {};
//   })
//   .controller('MainController', function(Auth){
//
//     var self = this;
//
//     Auth.onAuth(function(data){
//       console.log(user)
//       self.user = user;
//     });
//
//     this.login = Auth.login;
//
//     this.logout = Auth.logout;
//     });
