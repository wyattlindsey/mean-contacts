'use strict';

angular.module('contactsApp')
  .directive('contactDetails', function () {
    return {
      templateUrl: 'components/contactDetails/contactDetails.html',
      restrict: 'AE',
      link: function (scope, element, attrs) {


      }
    };
  });