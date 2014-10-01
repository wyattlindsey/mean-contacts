'use strict';

angular.module('contactsApp')
  .controller('ContactsCtrl', function ($scope, $http) {

    $scope.contacts = [];
    $scope.selectedItems = [];
    $scope.filterOptions = {
      filterText: ''
    };

    $scope.gridOptions = {
      data: 'contacts',
      selectedItems: $scope.selectedItems,
      multiSelect: 'false',
      afterSelectionChange: function(rowItem, event) {
        var imageURL = $scope.contacts[rowItem.rowIndex].avatar;
        var avatarImageHTML = '<img src="' + imageURL + '" height="150" width="150" ' +
            'class="img-rounded">';
        console.log(avatarImageHTML);
        $('.contact-pane-avatar').html(avatarImageHTML);
      },
      columnDefs: [
        {field: 'firstName', displayName: 'First name', enableCellEdit: true},
        {field: 'lastName', displayName: 'Last name', enableCellEdit: true},
        {field: 'phone', displayName: 'Phone', enableCellEdit: true},
        {field: 'email', displayName: 'Email', enableCellEdit: true}
      ],
      filterOptions: $scope.filterOptions
    };


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
