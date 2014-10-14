'use strict';

angular.module('contactsApp')
  .directive('contactDetails', function () {
    return {
      templateUrl: 'components/contactDetails/contactDetails.html',
      restrict: 'AE',
      link: function (scope, element, attrs) {
        scope.$watch('singleSelectedItem', function(newValue, oldValue) {
          if (newValue === oldValue) {
            return false;
          } else if (!newValue) {
            console.log('empty');
          }
        });
      }
    };
  });