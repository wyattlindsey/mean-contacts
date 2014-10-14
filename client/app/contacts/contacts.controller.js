'use strict';

angular.module('contactsApp')
  .controller('ContactsCtrl', function ($scope, $http, $q) {

    $scope.contacts = [];

    $scope.getContacts = function() {
      var deferred = $q.defer();

      $http.get('/api/contacts').success(function (contacts) {
        $scope.contacts = contacts;
        deferred.resolve();
      }).
      error(function(data) {
        deferred.reject('Get failed: ' + data);
      });

      return deferred.promise;
    };

    // initialize table data
    $scope.getContacts();

    $scope.addContact = function(data) {
      if (data === '') {
        return;
      }
      $http.post('/api/contacts', JSON.stringify(data)).success(function(data) {
        $scope.getContacts();
        return data;
      });

    };

    $scope.updateContact = function(id, data) {

      var deferred = $q.defer();

      if (data === '' || id === '') {
        deferred.reject('Invalid data');
      } else {
        $http.put('/api/contacts/' + id, JSON.stringify(data)).success(function () {
            deferred.resolve();
        }).
            error(function (data) {
              deferred.reject('Update failed: ' + data);
            });
      }

      return deferred.promise;
    };


    $scope.deleteContact = function(id) {
      $http.delete('/api/contacts/' + id).success(function(data) {
        return data;
      }).
      error(function(err) {
        console.log(err);
      });
    };

  });