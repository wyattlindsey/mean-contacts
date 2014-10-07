'use strict';

angular.module('contactsApp')
  .directive('contactDetails', function () {
    return {
      templateUrl: 'components/contactDetails/contactDetails.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });