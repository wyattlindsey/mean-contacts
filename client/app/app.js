'use strict';

angular.module('contactsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.grid',
  'ui.grid.selection',
  'ui.grid.edit',
  'xeditable'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/contacts'
      });

    $locationProvider.html5Mode(true);



  })
    .run(function(editableOptions) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });;


