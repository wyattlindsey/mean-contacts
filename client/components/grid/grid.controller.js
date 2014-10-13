'use strict';

angular.module('contactsApp')
  .controller('GridCtrl', function ($scope, detailsViewService) {

      $scope.selectedItems = [];
      $scope.singleSelectedItem = null;
      $scope.allowCellEdit = true;
      $scope.editInProgress = false;

      $scope.$watch('editInProgress', function() {
        console.log('changed');
      });

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
              $scope.singleSelectedItem = null;
            }

            // logic for updating data in contact details view
            if ($scope.selectedItems.length === 1) {
              //just one item selected
              $scope.singleSelectedItem = row.entity;
            } else {
              //clear out data and pull in defaults when more than one row is selected
              $scope.singleSelectedItem = null;
            }
          });

          gridApi.edit.on.beginCellEdit($scope, function(rowEntity, colDef) {
            $scope.editInProgress = true;
            $scope.singleSelectedItem = rowEntity;
            $scope.$apply();
          });

          gridApi.edit.on.cancelCellEdit($scope, function(rowEntity, colDef) {
            $scope.editInProgress = false;
            $scope.singleSelectedItem = null;
            $scope.selectedItems = [];
            $scope.$apply();
          });

          gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
            $scope.editInProgress = false;
            $scope.singleSelectedItem = null;
            $scope.selectedItems = [];
            $scope.updateContact(rowEntity._id, rowEntity);
            $scope.$apply();
          });


      };

        $scope.gridOptions.columnDefs = [
          {field: 'firstName', displayName: 'First name', enableCellEdit: true,
            cellEditableCondition: function() {
              return $scope.allowCellEdit;
            },
            filter: {
              condition: function(searchTerm, cellValue) {
                return cellValue.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
              }
            }
          },
          {field: 'lastName', displayName: 'Last name', enableCellEdit: true,
            cellEditableCondition: function() {
              return $scope.allowCellEdit;
            },
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
            cellEditableCondition: function() {
              return $scope.allowCellEdit;
            },
            filter: {
              condition: function(searchTerm, cellValue) {
                var strippedValue = (cellValue + '').toLowerCase().replace(/[^\d]/g, '');
                return strippedValue.indexOf(searchTerm.toLowerCase()) >= 0;
              }
            }
          },
          {field: 'email', displayName: 'Email', enableCellEdit: true,
            cellEditableCondition: function() {
              return $scope.allowCellEdit;
            },
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
      };

      // handle editing/double-click/deselection conundrum
      $('.contacts-grid').dblclick(function() {
        $scope.allowCellEdit = true;
      });

      // keydown/keyup to enable/disable multi-select
      $('body').keydown(function (e) {
        if ((e.keyCode === 16 || e.keyCode === 17 || e.metaKey || e.keyCode === 224 || e.keyCode === 91 || e.keyCode === 93) && !$scope.multiSelect) {
          $scope.gridApi.selection.setMultiSelect(true);
          $scope.allowCellEdit = false;
        }
      }).keyup(function (e) {
        if (e.keyCode === 16 || e.keyCode === 17 || e.metaKey || e.keyCode === 224 || e.keyCode === 91 || e.keyCode === 93) {
          $scope.gridApi.selection.setMultiSelect(false);
          $scope.allowCellEdit = true;
        }
      });

      //handle case of meta-tab to other application
      //where keyup never happens and multi-select stays true
      $(window).blur(function() {
        $scope.gridApi.selection.setMultiSelect(false);
        $scope.allowCellEdit = true;
      });

  });
