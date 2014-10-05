'use strict';

angular.module('contactsApp')
  .controller('GridCtrl', function ($scope, detailsViewService) {

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
            // then add selected item
            $scope.selectedItems.push(row);

            // logic for multi-select when shift/ctr/meta key are pressed down


            // handle case where row is deselected
            if ($scope.selectedItems[0].entity._id === row.entity._id && !row.isSelected) {

              //clear out data and pull in defaults
              $scope.selectedItems = [];

              detailsViewService.clearDetailsView();


            }

            // logic for updating data in contact details

            if ($scope.selectedItems.length === 1) {

              // pull data into contact details
              detailsViewService.setAvatarImage(row.entity.avatar);

            } else {

              //clear out data and pull in defaults
              detailsViewService.clearDetailsView();
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
