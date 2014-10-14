'use strict';

angular.module('contactsApp')
  .directive('contactDetails', function () {
    return {
      templateUrl: 'components/contactDetails/contactDetails.html',
      restrict: 'AE',
      link: function (scope, element, attrs) {

        $('.editable-click').hover(
            function () {
              $(this).addClass('.hover-lighten');
            },
            function () {
              $(this).removeClass('.hover-lighten');
            }
        );

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