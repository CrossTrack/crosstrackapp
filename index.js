'use strict';

angular.module('activ8', [ 'firebase' ])
  /*
   * Global Configuration Object
   */
  .constant('CONFIG', {
    Firebase: {
      baseUrl: 'https://activ8.firebaseio.com'
    }
  })
