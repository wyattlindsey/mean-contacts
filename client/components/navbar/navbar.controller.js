'use strict';

angular.module('contactsApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Contacts',
      'link': '/contacts'
    },
      {
        'title': 'Help',
        'link': '/help'
      }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });