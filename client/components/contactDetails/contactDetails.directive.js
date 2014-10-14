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
            $('.contact-pane-avatar img').attr('src', 'http://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png');
          }
        });
      }
    };
  });