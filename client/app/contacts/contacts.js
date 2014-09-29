'use strict';

angular.module('contactsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/contacts', {
        templateUrl: 'app/contacts/contacts.html',
        controller: 'ContactsCtrl'
      });

    $(document).ready(function() {
      $('#contactsTable').dataTable({
        bFilter: false,
        bInfo: false,
        bPaginate: false
      });
    });

  });
