'use strict';

angular.module('contactsApp')
  .controller('gridCtrl', function ($scope) {

      $scope.selectedItems = [];

      $scope.gridOptions = {
        data: 'contacts',
        enableFiltering: true,
        enableRowSelection: true,
        multiSelect: false,
        enableRowHeaderSelection: false
      };

      $scope.gridOptions.onRegisterApi = function(gridApi) {
          $scope.gridApi = gridApi;
          gridApi.selection.on.rowSelectionChanged($scope,function(row){



            //clear selectedItems array if needed
            if (!$scope.gridOptions.multiSelect) {

              $scope.selectedItems = [];

            }
            $scope.selectedItems.push(row);
            // logic for multi-select when shift/ctr/meta key are pressed down


            // handle case where row is deselected
            if ($scope.selectedItems[0].entity._id === row.entity._id && !row.isSelected) {

              $scope.selectedItems = [];
              //clear out data and pull in defaults
              imageURL = 'http://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
              avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
                  'class="img-rounded">';
              $('.contact-pane-avatar').html(avatarImageHTML);
            }

            // logic for updating data in contact details

            if ($scope.selectedItems.length === 1) {


              // pull data into contact details
              var imageURL = row.entity.avatar;
              var avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
                  'class="img-rounded">';
              $('.contact-pane-avatar').html(avatarImageHTML);
            } else {
              //clear out data and pull in defaults
              imageURL = 'http://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
              avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
                  'class="img-rounded">';
              $('.contact-pane-avatar').html(avatarImageHTML);
            }
          });
        };

        $scope.gridOptions.columnDefs = [
          {field: 'firstName', displayName: 'First name',
            filter: {
              condition: function(searchTerm, cellValue) {
                return cellValue.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
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
                return cellValue.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
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
                return cellValue.toLowerCase().search(searchTerm.toLowerCase()) >= 0;
              }
            }
          }
        ];
      
  });
