'use strict';

angular.module('contactsApp')
  .controller('ContactsCtrl', function ($scope, $http) {

    $scope.contacts = [];

    $scope.gridOptions = {
      data: 'contacts',
//      enableFiltering: true
      enableRowSelection: true,
      multiSelect: false,
      enableRowHeaderSelection: false,
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
        {field: 'firstName', displayName: 'First name'},
        {field: 'lastName', displayName: 'Last name',
          sort: {
            direction: 'asc',
            priority: 1
          }
        },
        {field: 'phone', displayName: 'Phone'},
        {field: 'email', displayName: 'Email'}
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

//    $(document).ready(function(){
//      $('#contactsTable').DataTable({
//        "bInfo": false
//      });
//    });

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

    $scope.processCreateForm = function() {
//      console.log('hi');
    };

  });
