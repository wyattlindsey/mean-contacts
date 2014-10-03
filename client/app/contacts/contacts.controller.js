'use strict';

angular.module('contactsApp')
  .controller('ContactsCtrl', function ($scope, $http) {

    $scope.contacts = [];
    $scope.selectedItems = [];

    $scope.gridOptions = {
      data: 'contacts',
      enableFiltering: true,
      enableRowSelection: true,
      multiSelect: false,
      enableRowHeaderSelection: false,
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
          var msg = 'row selected ' + row.index;
          console.log(msg);
        });
      },
////      selectedItems: $scope.selectedItems,
////      afterSelectionChange: function(rowItem, event) {
////        // if there are any selected items
////        if ($scope.selectedItems.length) {
////          var imageURL = $scope.contacts[rowItem.rowIndex].avatar;
////          var avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
////              'class="img-rounded">';
////          console.log($scope.selectedItems);
////          $('.contact-pane-avatar').html(avatarImageHTML);
////        } else {
////          imageURL = 'http://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
////          avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
////              'class="img-rounded">';
////          console.log($scope.selectedItems);
////          $('.contact-pane-avatar').html(avatarImageHTML);
////        }
////
////      },
      columnDefs: [
        {field: 'firstName', displayName: 'First name',
          filter: {
            condition: function(searchTerm, cellValue) {
              var wildcardValue = cellValue.toLowerCase().replace(/[.]/g, '*');
              return wildcardValue.indexOf(searchTerm.toLowerCase()) >= 0;
            }
          }
        },
        {field: 'lastName', displayName: 'Last name',
          sort: {
            direction: 'asc',
            priority: 1
          },
          filter: {
            condition: function(searchTerm, cellValue) {
              var wildcardValue = cellValue.toLowerCase().replace(/[.]/g, '*');
              return wildcardValue.indexOf(searchTerm.toLowerCase()) >= 0;
            }
          }
        },
        {field: 'phone', displayName: 'Phone',
          filter: {
            condition: function(searchTerm, cellValue) {
              var strippedValue = (cellValue + '').toLowerCase().replace(/[^\d]/g, '');
              return strippedValue.indexOf(searchTerm.toLowerCase()) >= 0;
            }
          }
        },
        {field: 'email', displayName: 'Email',
          filter: {
            condition: function(searchTerm, cellValue) {
              //The dot character invalidates this search. Not sure what's really happening for these regexes
              var wildcardValue = cellValue.toLowerCase().replace(/[.*]/g, '*');
              return wildcardValue.indexOf(searchTerm.toLowerCase()) >= 0;
            }
          }
        }
      ]
    };

    console.log($scope.gridOptions);


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
      });

    };

    $scope.deleteContact = function(id) {
      $http.delete('/api/contacts/' + id).success(function(data) {
        $scope.getContacts();
      });
    };

  });
