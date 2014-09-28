'use strict';

angular.module('contactsApp')
  .controller('ContactsCtrl', function ($scope, $http) {

    $scope.contacts = [];

    $(document).ready(function(){
      $('#contactsTable').DataTable();
    });

    $http.get('/api/contacts').success(function(contacts) {
      $scope.contacts = contacts;
    });

    $scope.addContact = function() {
      if($scope.newContact === '') {
        return;
      }
      $http.post('/api/contacts', { name: $scope.newContact });
      $scope.newContact = '';
    };

    $scope.deleteContact = function(contact) {
      $http.delete('/api/contacts/' + contact._id);
    };
  });
