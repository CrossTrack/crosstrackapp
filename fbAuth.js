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
      /**
       * Wrapper for `$firebaseAuth.$unauth()`
       */
      logout: function(){
        console.log('Logged out.');
        auth.$unauth();
      },
      /**
      *Show/Hide login menu
      */
      loggedIn: function(){
       if(Firebase.getAuth() != null){
         return true;
       }
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
         avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url
      });

      user.$save();

      return user;
    } // END updateUser
  }) // END factory(Auth)

  /**
   * Main application Controller
   *
   * @method {Promise} login -- trigger the login workflow
   * @method {undefined} logout -- trigger the logout workflow
   */
  .controller('MainCtrl', function(Auth){
    var self = this;

    this.login = Auth.login;

    this.loggedIn = Auth.loggedIn;

    this.logOut = Auth.logout;

    Auth.onAuth(function(user){
      self.user = user;
    });
  });
