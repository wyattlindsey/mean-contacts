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
          gridApi.selection.on.rowSelectionChanged($scope, function(row){

            $scope.selectedItems = gridApi.selection.getSelectedRows();

            // TO-DO logic for multi-select when shift/ctr/meta key are pressed down

            // handle case where row is deselected
            if ($scope.selectedItems === row.entity && !row.isSelected) {
              //clear out data and pull in defaults
              $scope.selectedItems = [];
              detailsViewService.clearDetailsView();
            }

            // logic for updating data in contact details
            if ($scope.selectedItems.length === 1) {
              // pull data into contact details
              detailsViewService.setDetailsView($scope.selectedItems[0]);
            } else {
              //clear out data and pull in defaults
              detailsViewService.clearDetailsView();
            }
          });

          gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue) {

            $scope.$apply();
            $scope.updateContact(rowEntity._id, rowEntity);
            gridApi.selection.selectRow(rowEntity);
            detailsViewService.setDetailsView(rowEntity);
          })
        };

        $scope.gridOptions.columnDefs = [
          {field: 'firstName', displayName: 'First name', enableCellEdit: true,
            filter: {
              condition: function(searchTerm, cellValue) {
                return cellValue.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
              }
            }
          },
          {field: 'lastName', displayName: 'Last name', enableCellEdit: true,
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
          {field: 'phone', displayName: 'Phone', enableCellEdit: true,
            filter: {
              condition: function(searchTerm, cellValue) {
                var strippedValue = (cellValue + '').toLowerCase().replace(/[^\d]/g, '');
                return strippedValue.indexOf(searchTerm.toLowerCase()) >= 0;
              }
            }
          },
          {field: 'email', displayName: 'Email', enableCellEdit: true,
            filter: {
              condition: function(searchTerm, cellValue) {
                return cellValue.toLowerCase().search(searchTerm.toLowerCase()) >= 0;
              }
            }
          }
        ];

      $scope.selectSingleRow = function() {


      };

      $scope.deleteSelected = function() {



        for (var selectedItem in $scope.selectedItems) {
          $scope.deleteContact($scope.selectedItems[selectedItem]._id);
        }
        $scope.selectedItems = [];
        detailsViewService.clearDetailsView();
      };

      // keydown/keyup to enable/disable multi-select
      $('body').keydown(function (e) {
        if ((e.keyCode === 16 || e.keyCode === 17 || e.metaKey || e.keyCode === 224 || e.keyCode === 91 || e.keyCode === 93) && !$scope.multiSelect) {
          $scope.gridApi.selection.setMultiSelect(true);
        }
      }).keyup(function (e) {
        if (e.keyCode === 16 || e.keyCode === 17 || e.metaKey || e.keyCode === 224 || e.keyCode === 91 || e.keyCode === 93) {
          $scope.gridApi.selection.setMultiSelect(false);
        }
      });

      //handle case of meta-tab to other application
      //where keyup never happens and multi-select stays true
      $(window).blur(function() {
        $scope.gridApi.selection.setMultiSelect(false);
      });

  });
