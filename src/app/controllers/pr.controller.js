'use strict';

angular.module('activ8')

/**
*Personal Bests controller
*/
.controller('prController', function(Auth, $firebase, CONFIG){

  var self = this;

  Auth.onAuth(function(user){
    self.user = user;
  });
})


// WIP - Updating PRs
/*

.directive('contenteditable', function (Auth, $firebase, Firebase) {
    var self = this;
    var newValue = 0;
    // Auth.onAuth(function(user){
    //   self.user = user;
    // });
    console.log(newValue);
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
                var userPRs = Firebase.child('users').child('761611353874710').child('pr')//.child('name')
                  userPRs.update({
                    best: {weight: newValue}
                  })
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function () {
                scope.$apply(readViewText);
            });

            // No need to initialize, AngularJS will initialize the text based on ng-model attribute

            // Write data to the model
            function readViewText() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if (attrs.stripBr && html == '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
                newValue = ngModel.$modelValue;
            }

        }
    };
});
*/

  /**
  *Returns Personal Best for selected movement
  */
  // this.viewPr = function(selectedPr){
  //   return Math.max.apply(null, selectedPr);
  // }
