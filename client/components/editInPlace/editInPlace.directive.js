'use strict';

angular.module('contactsApp')
  .directive('editInPlace', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the editInPlace directive');
      }
    };
  });