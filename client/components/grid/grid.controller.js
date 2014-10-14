'use strict';

angular.module('contactsApp')
  .controller('GridCtrl', function ($scope, $q, detailsViewService) {

      $scope.selectedItems = [];
      $scope.singleSelectedItem = null;
      $scope.allowCellEdit = true;
      $scope.editInProgress = false;

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
            console.log(row);

            // logic for updating data in contact details view
            if ($scope.selectedItems.length === 1) {
              //just one item selected
              $scope.singleSelectedItem = $scope.selectedItems[0];
            } else {
              //clear out data and pull in defaults when more than one row is selected
              $scope.singleSelectedItem = null;
            }

            // deselecting row when multiple items are selected but multiSelect is false
            if ($scope.selectedItems.length > 1 && !$scope.gridOptions.multiSelect && !row.isSelected) {
              $scope.selectedItems = [];
              $scope.singleSelectedItem = null;
              $scope.selectSingleRow(row.entity);
            }

            if ($scope.editInProgress) {
              $scope.selectSingleRow(row.entity);
            }

          });

          gridApi.edit.on.beginCellEdit($scope, function(rowEntity, colDef) {
            $scope.editInProgress = true;
            $scope.singleSelectedItem = rowEntity;
            $scope.selectSingleRow(rowEntity);
            $scope.$apply();
          });

          gridApi.edit.on.cancelCellEdit($scope, function(rowEntity, colDef) {
            $scope.editInProgress = false;
            $scope.selectSingleRow(rowEntity);
            $scope.$apply();
          });

          gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {

            $scope.editInProgress = false;
            var editedRow = rowEntity;

            if (newValue != oldValue) {
              $scope.updateContact(rowEntity._id, rowEntity)
                .then(function() {
                    $scope.getContacts().then(function() {
                      $scope.selectSingleRow(editedRow);
                    });
                  });
            }
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

      $scope.selectSingleRow = function(rowEntity) {
        $scope.gridApi.selection.clearSelectedRows();
        $scope.selectedItems[0] = rowEntity;
        $scope.singleSelectedItem = rowEntity;
        $scope.gridApi.selection.selectRow(rowEntity);
      };

      $scope.deleteSelected = function() {

        var deleteLoop = function() {

          var deferred = $q.defer();
          var i = 0;
          var deletePromise;
          $scope.qtyResolved = 0;

          $scope.$watch('qtyResolved', function() {
            if ($scope.qtyResolved == $scope.selectedItems.length) {
              deferred.resolve();
            }
          });

          while (i < $scope.selectedItems.length) {
            deletePromise = $scope.deleteContact($scope.selectedItems[i]._id);
            deletePromise.then(function() {
              $scope.qtyResolved ++;
            });
            i++;
          }
          return deferred.promise;
        };

        deleteLoop().then(function() {
          $scope.getContacts();
          $scope.selectedItems = [];
          $scope.singleSelectedItem = null;
        }, function(err) {
          console.log(err);
        });
      };

      // keydown/keyup to enable/disable multi-select
      $('body').keydown(function (e) {
        if ((e.keyCode === 16 || e.keyCode === 17 || e.metaKey || e.keyCode === 224 || e.keyCode === 91 || e.keyCode === 93) && !$scope.multiSelect) {
          $scope.gridApi.selection.setMultiSelect(true);
          $scope.gridOptions.multiSelect = true;
          $scope.allowCellEdit = false;
        }
      }).keyup(function (e) {
        if (e.keyCode === 16 || e.keyCode === 17 || e.metaKey || e.keyCode === 224 || e.keyCode === 91 || e.keyCode === 93) {
          $scope.gridApi.selection.setMultiSelect(false);
          $scope.gridOptions.multiSelect = false;
          $scope.allowCellEdit = true;
        }
      });

      //handle case of meta-tab to other application
      //where keyup never happens and multi-select stays true
      $(window).blur(function() {
        $scope.gridApi.selection.setMultiSelect(false);
        $scope.gridOptions.multiSelect = false;
        $scope.allowCellEdit = true;
      });

      // arrow keys move selection up and down
      $(document).keydown(function(e) {
        switch(e.which) {
          // I don't see a way in the public API to get the sorted array of rows
          case 38: // up

            break;

          case 40: // down

            break;

          default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
      });

  });
