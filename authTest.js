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

/*
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

  .controller('MainController', function(CONFIG, $firebase, $firebaseAuth){
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
*/

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
