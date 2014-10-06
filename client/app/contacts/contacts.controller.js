'use strict';

angular.module('contactsApp')
  .controller('ContactsCtrl', function ($scope, $http) {

    $scope.contacts = [];

    $scope.getContacts = function() {
      $http.get('/api/contacts').success(function (contacts) {
        $scope.contacts = contacts;
      });
    };

    // initialize table data
    $scope.getContacts();

    $scope.addContact = function(data) {
      if(data === '') {
        return;
      }
      $http.post('/api/contacts', JSON.stringify(data)).success(function(data){
        $scope.getContacts();
        return data;
      });

    };

    $scope.deleteContact = function(id) {
      $http.delete('/api/contacts/' + id).success(function(data) {
        $scope.getContacts();
      });
    };

  });
