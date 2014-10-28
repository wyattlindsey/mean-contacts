'use strict';

angular.module('contactsApp')
  .controller('ContactsCtrl', function ($scope, $http, $q) {

    $scope.contacts = [];

    // for timing
    $scope.start = 0.0;
    $scope.end = 0.0;

    $scope.getContacts = function() {
      var deferred = $q.defer();

      $http.get('/api/contacts').success(function (contacts) {
        $scope.contacts = contacts;
        deferred.resolve(contacts);
      }).
      error(function(err) {
        deferred.reject('Get failed: ' + err);
      });
      return deferred.promise;
    };


    // initialize table data
    $scope.getContacts();

    $scope.addContact = function(data) {
      var deferred = $q.defer();

      if (data === '') {
        deferred.reject('no data');
      } else {
        $http.post('/api/contacts', JSON.stringify(data)).success(function(data) {
          deferred.resolve(data);
        }).error(function(err) {
          deferred.reject(err);
        });
      }
      return deferred.promise;
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
      var deferred = $q.defer();

      if (id === '') {
        deferred.reject('no ID provided')
      } else {
        $http.delete('/api/contacts/' + id).success(function(data) {
          deferred.resolve();
        }).
        error(function(err) {
          console.log(err);
        });
      }
      return deferred.promise;
    };

  });

