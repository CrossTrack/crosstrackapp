'use strict';

angular.module('activ8', []);
var self = this;
var ref = new Firebase(
  'https://activ8.firebaseio.com');


  // Log in logic.
  // ref.authwithOAuthPopup('facebook', function(){
  //   console.log(arguements);
  // });

var users = new Firebase(
  'https://activ8.firebaseio.com/users');


// This is to log out.
// ref.unauth();

// Getting/Storing user data.
// var user = ref.getAuth();
// users.child(user.uid);
// users.child(user.uid).set(ref.getAuth);

var authdUser = auth.getAuth();
users.child(authdUser.uid).set({
  uid: authdUser.uid,
  facebook: authdUser.facebook,
  fullName: authdUser.facebook.displayName,
  avatarUrl: authdUser.facebook.cachedUserProfile.picture.data.url
});
