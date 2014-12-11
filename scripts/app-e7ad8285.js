"use strict";angular.module("activ8",["firebase","ngRoute"]).constant("CONFIG",{Firebase:{baseUrl:"https://activ8.firebaseio.com"}}).config(["$routeProvider",function(e){e.when("/login",{templateUrl:"app/views/login.html"}).when("/",{templateUrl:"app/views/main.html"}).when("/new-workout",{templateUrl:"app/views/new-workout.html",controller:"NewWorkoutController",controllerAs:"work"}).when("/history",{templateUrl:"app/views/history.html",controller:"HistoryController",controllerAs:"history"}).otherwise({redirectTo:"/"})}]),angular.module("activ8").factory("Firebase",["CONFIG",function(e){return new Firebase(e.Firebase.baseUrl)}]).factory("Auth",["Firebase","$firebaseAuth","$firebase",function(e,t,a){function o(t){if(null===t)return null;var o=a(e.child("users").child(t.facebook.id)).$asObject();return angular.extend(o,{uid:t.facebook.id,facebook:t.facebook,fullName:t.facebook.displayName,avatarUrl:t.facebook.cachedUserProfile.picture.data.url,gender:t.facebook.cachedUserProfile.gender}),o.$save(),s=o,o}var n=t(e),s={};return{onAuth:function(e){n.$onAuth(function(t){e(o(t))})},login:function(){return n.$authWithOAuthRedirect("facebook")},loggedIn:function(){return n.$getAuth()?!0:void 0},logout:function(){n.$unauth()},getUser:function(){return s}}}]).controller("MainController",["Auth","$location",function(e,t){var a=this;this.login=e.login,this.logout=e.logout,e.onAuth(function(e){return a.user=e,t.path(null===e?"/login":"/")}),this.loggedIn=e.loggedIn,this.chevron=function(){return"/"===t.path()||"/login"===t.path()?!1:!0}}]),angular.module("activ8").controller("NavbarCtrl",["$scope",function(e){e.date=new Date}]),angular.module("activ8").controller("NewWorkoutController",["Auth","$firebase","$location",function(e,t,a){var o=new Firebase("https://activ8.firebaseio.com/workouts/"+e.getUser().uid),n={PullUps:{name:"Pull Ups",type:1},PushUps:{name:"Push Ups",type:1},HandstandPushUps:{name:"Handstand Push Ups",type:1},SitUps:{name:"Sit Ups",type:1},GHDSitUps:{name:"GHD Sit Ups",type:1},PowerClean:{name:"Power Clean",type:2},SquatClean:{name:"Squat Clean",type:2},HangPowerClean:{name:"Hang Power Clean",type:2},HangSquatClean:{name:"Hang Squat Clean",type:2},PowerSnatch:{name:"Power Snatch",type:2},SquatSnatch:{name:"Squat Snatch",type:2},HangPowerSnatch:{name:"Hang Power Snatch",type:2},HangSquatSnatch:{name:"Hang Squat Snatch",type:2},"Clean&Jerk":{name:"Clean & Jerk",type:2},PushJerk:{name:"Push Jerk",type:2},Jerk:{name:"Jerk",type:2},SplitJerk:{name:"Split Jerk",type:2},Squat:{name:"Squat",type:2},OverheadSquat:{name:"Overhead Squat",type:2},FrontSquat:{name:"Front Squat",type:2},Deadlift:{name:"Deadlift",type:2},SumoDeadlift:{name:"Sumo Deadlift",type:2},MuscleUps:{name:"Muscle Ups",type:1},BarMuscleUps:{name:"Bar Muscle Ups",type:1},RingRows:{name:"Ring Rows",type:1},"Pistol Squats":{name:"Pistol Squats",type:1},KettlebellSwingsAmerican:{name:"Kettlebell Swings American",type:1},KettlebellSwingsRussian:{name:"Kettlebell Swings Russian",type:1},TireFlips:{name:"Tire Flips",type:1},BearCrawls:{name:"Bear Crawls",type:1},Thrusters:{name:"Thrusters",type:1},Clusters:{name:"Clusters",type:1},StrictPress:{name:"Strict Press",type:1},PushPress:{name:"Push Press",type:1},BenchPress:{name:"Bench Press",type:1},RopeClimbs:{name:"Rope Climbs",type:1},WallBalls:{name:"Wall Balls",type:1}};this.workout=[],this.addMove=function(){this.workout.push({name:"",reps:"",rds:"",weight:"",moveNumber:this.workout.length+1})},console.log(this.workout),this.delete=function(e){var t=this.workout.indexOf(e);this.workout.splice(t,1)},this.date=Date.now();var s=t(o);this.newWorkout=s.$asArray(),this.addWork=function(e){this.newWorkout.$add({date:Date.now(),movements:e}),this.workout=[],console.log(this.workout),a.path("/history")},this.disable=function(){return $("form").hasClass("ng-pristine")?!0:!1},this.moveList={},this.moveList.movements=n}]),angular.module("activ8").controller("HistoryController",["Auth","$firebase",function(e,t){var a=new Firebase("https://activ8.firebaseio.com/workouts/"+e.getUser().uid).orderByKey().limitToLast(3),o=t(a);this.historyList=o.$asArray(),console.log(this.historyList),console.log(e.getUser().uid)}]),function(e){try{e=angular.module("activ8")}catch(t){e=angular.module("activ8",[])}e.run(["$templateCache",function(e){e.put("app/views/dashboard.html",'<section ng-show="app.loggedIn()" id="dashboard" class="main-dash"><nav class="navbar navbar-default main-nav" role="navigation"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#"><img class="ree" src="./assets/images/reebokxfit.png" alt=""></a><section class="appName navbar-left"><a class="name" href="#"><h1>Activ8</h1></a></section><button ng-click="app.logout()" class="btn navbar-right logout-button">Logout</button></div></div></nav><div class="row row-1"><section class="avatar col-xs-5"><img ng-src="{{app.user.avatarUrl}}" class="img-responsive img-rounded fb-avatar" alt="" width="100px" height="100px"><p class="fbName">{{app.user.fullName|| displayName}}</p></section><section class="plus-workout col-xs-7"><button type="button" class="btn btn-success work-btn glyphicon glyphicon-plus">NewWorkout</button></section></div><div class="row row-2"><section class="daysActive col-xs-12"><h3>Days Active Chart</h3></section></div><div class="row row-3"><section class="myHistory col-xs-12" ng-controller="HistoryController as history"><p>My History</p></section></div><section class="page-down"><a href="#personalBests"><span class="glyphicon glyphicon-chevron-down"></span></a></section></section><section ng-show="app.loggedIn()" id="personalBests"><h3 class="records">Personal Records(PR\'s)</h3><ul class="prDrop"><li><label for="personalRecords">Select Movement:</label><br><select type="text" id="personalRecords" placeholder="Breaking Records"><optgroup label="Clean"><option value="Power Clean">Power Clean</option><option value="Squat Clean">Squat Clean</option><option value="Hang Power Clean">Hang Power Clean</option><option value="Hang Squat Clean">Hang Squat Clean</option><option value="Clean & Jerk">Clean & Jerk</option></optgroup><optgroup label="Jerk"><option value="Jerk">Jerk</option><option value="Split Jerk">Split Jerk</option><option value="Push Jerk">Push Jerk</option></optgroup><optgroup label="Snatch"><option value="Power Snatch">Power Snatch</option><option value="Squat Snatch">Squat Snatch</option></optgroup></select></li></ul><section class="page-up col-xs-12"><a href="#dashboard"><span class="glyphicon glyphicon-chevron-up"></span></a></section></section>')}])}(),function(e){try{e=angular.module("activ8")}catch(t){e=angular.module("activ8",[])}e.run(["$templateCache",function(e){e.put("app/views/history.html",'<section class="main container-fluid"><section class="my-history col-xs-12"><h2 class="histroy-head">My History</h2><div class="history-list" ng-repeat="work in history.historyList | orderBy:\'date\':true"><h4>{{work.date | date:\'short\'}}</h4><div class="move-listings" ng-repeat="move in work.movements"><h5>{{move.name}}</h5><p>Reps: {{move.reps}}</p><p>Rds: {{move.rds}}</p><p>Lbs: {{move.weight}}</p></div></div></section></section>')}])}(),function(e){try{e=angular.module("activ8")}catch(t){e=angular.module("activ8",[])}e.run(["$templateCache",function(e){e.put("app/views/login.html",'<section class="kettleBox"><figure ng-click="app.login()"><a><img src="./assets/images/fbkettle.png" alt="" class="img-responsive kettle"></a><br><figcaption class="loginText"><a href="#"><h3>Login</h3></a></figcaption></figure><footer><em>Privacy Policy</em></footer></section>')}])}(),function(e){try{e=angular.module("activ8")}catch(t){e=angular.module("activ8",[])}e.run(["$templateCache",function(e){e.put("app/views/main.html",'<section id="dashboard" class="main-dash"><section class="new-dash"><div class="row row-1"><section class="avatar col-xs-12 "><img ng-src="{{app.user.avatarUrl}}" class="img-responsive img-rounded fb-avatar col-md-6" alt=""><p class="fbName col-md-6">{{app.user.fullName|| displayName}}</p></section></div></section><section class="dash-buttons"><div class="row row-2 button1"><a role="button" class="work-btn col-xs-12" href="#new-workout"><span class="glyphicon glyphicon-plus col-xs-2"></span><p class="col-xs-10 new-btn">New Workout</p></a></div><div class="row row-2 button2"><a role="button" class="history-btn col-xs-12" href="#history"><span class="glyphicon glyphicon-calendar col-xs-2"></span><p class="col-xs-10 new-btn">My History</p></a></div><div class="row row-2 button3"><a role="button" class="pr-btn col-xs-12" href="#pr"><span class="glyphicon glyphicon-fire col-xs-2"></span><p class="new-btn col-xs-10">My PR\'s</p></a></div></section></section>')}])}(),function(e){try{e=angular.module("activ8")}catch(t){e=angular.module("activ8",[])}e.run(["$templateCache",function(e){e.put("app/views/new-workout.html",'<section class="main"><form class="new-move" ng-submit="work.addWork(work.workout)" name="new"><label><h3>Today\'s Workout</h3></label><br><div class="new-moves" ng-repeat="move in work.workout"><input class="form-control" ng-model="move.name" type="text" list="moving" placeholder="Select Movement" autocomplete="on" required=""> <input type="text" class="form-control" ng-model="move.reps" placeholder="Reps" required=""> <input type="text" class="form-control" ng-model="move.rds" placeholder="Rounds" required=""><div class="input-group"><input type="text" class="form-control" ng-model="move.weight" placeholder="Weight"> <span class="input-group-btn"><button class="btn btn-danger glyphicon glyphicon-trash" type="button" ng-click="work.delete(move)"></button></span></div><input type="text" ng-hide="true" ng-model="move.moveNumber"><br></div><div><input type="button" class="add-move-btn" value="Add Movement" ng-click="work.addMove()"><br><input type="submit" class="save-btn" value="Save Workout" ng-hide="work.disable()"></div></form><datalist id="moving"><option data-ng-repeat="moves in work.moveList.movements" value="{{moves.name}}"></option></datalist><br></section>')}])}(),function(e){try{e=angular.module("activ8")}catch(t){e=angular.module("activ8",[])}e.run(["$templateCache",function(e){e.put("components/navbar/navbar.html",'<nav ng-hide="app.loggedIn()" class="navbar navbar-default main-nav" role="navigation" ng-controller="NavbarCtrl"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#"><img class="ree" src="./assets/images/reebokxfit.png" alt=""></a> <a class="name" href="#"><h1 class="appName">Activ8</h1></a></div></div></nav>')}])}();