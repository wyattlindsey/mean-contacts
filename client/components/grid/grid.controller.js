'use strict';

angular.module('contactsApp')
  .controller('GridCtrl', function ($scope, $q, $modal) {

      $scope.selectedItems = [];
      $scope.singleSelectedItem = null;
      $scope.allowCellEdit = true;
      $scope.editInProgress = false;
      $scope.unselectingMulti = false;
      $scope.modalActive = false;
      $scope.alerts = [];
      $scope.selectAllStatus = false;
      $scope.selectAllLabel = 'Select all';

      $scope.addAlert = function(msg, type) {
        // don't repeatedly add the same alert message
        for (var i = 0; i < $scope.alerts.length; i++) {
          if ($scope.alerts[i].msg === msg) {
            return;
          }
        }
        $scope.alerts.push({msg: msg, type: type});

        // close alert after 4 seconds
        setTimeout(function() {
          $scope.closeAlert($scope.alerts.indexOf(msg));
          $scope.$apply();
        }, 4000);
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      // set up ui-grid

      $scope.gridOptions = {
        data: 'contacts',
        enableFiltering: true,
        enableRowSelection: true,
        multiSelect: false,
        enableRowHeaderSelection: false
      };

      // initialize ui-grid

      $scope.gridOptions.onRegisterApi = function(gridApi) {
          $scope.gridApi = gridApi;

          gridApi.selection.on.rowSelectionChanged($scope, function(row) {

            // get current state of selected items
            $scope.selectedItems = gridApi.selection.getSelectedRows();


            // logic for updating data in contact details view
            if ($scope.selectedItems.length === 1) {
              //just one item selected
              $scope.singleSelectedItem = row.entity;
            } else {
              //clear out data and pull in defaults when more than one row is selected
              $scope.singleSelectedItem = null;
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

          $scope.$watch('selectedItems.length', function(value) {
            if (value <= 1) {
              $scope.selectAllLabel = 'Select all';
              $scope.selectAllStatus = false;
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
                var strippedValue = cellValue + '';
                return strippedValue.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
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
                var strippedValue = cellValue + '';
                return strippedValue.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
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
                var strippedValue = cellValue + '';
                return strippedValue.toLowerCase().search(searchTerm.toLowerCase()) >= 0;
              }
            }
          }
        ];

      $scope.selectAllRows = function() {

        if (!$scope.selectAllStatus) {
          $scope.selectAllLabel = 'Unselect all';
          $scope.gridApi.selection.setMultiSelect(true);
          $scope.gridApi.selection.selectAllVisibleRows();
          $scope.selectedItems = $scope.gridApi.selection.getSelectedRows();
          $scope.singleSelectedItem = null;
          $scope.gridApi.selection.setMultiSelect(false);
          $scope.selectAllStatus = true;
        } else {
          $scope.selectAllLabel = 'Select all';
          $scope.gridApi.selection.clearSelectedRows();
          $scope.selectedItems.length = 0;
          $scope.selectAllStatus = false;
        }

      };

      $scope.selectSingleRow = function(rowEntity) {
        if (!$scope.editInProgress) {
          $scope.gridApi.selection.clearSelectedRows();
        }
        $scope.gridApi.selection.selectRow(rowEntity);
        // To do: find out why selecting the row after addContact() doesn't show the selected Style
      };

      $scope.updateContactDetails = function() {
        $scope.updateContact($scope.singleSelectedItem._id, $scope.singleSelectedItem)
            .then(function() {
              $scope.getContacts();
            })
            .then(function() {
              $scope.selectSingleRow($scope.singleSelectedItem);
            });
      };

      $scope.createContactsBulk = function(data) {

        $scope.creationMode = true;
        $scope.progressMax = data.length;


        var creationLoop = function() {

          var deferred = $q.defer();
          var i = 0;
          var creationPromise;
          $scope.qtyResolved = 0;

          $scope.$watch('qtyResolved', function() {
            $scope.progressValue = ($scope.qtyResolved * 100 / $scope.progressMax).toFixed(2);
            if ($scope.qtyResolved == data.length) {
              deferred.resolve();
            }
          });

          while (i < data.length) {
            creationPromise = $scope.addContact(data[i]);
            creationPromise.then(function() {
              $scope.qtyResolved++;
            });
            i++;
          }
          return deferred.promise;
        };

        creationLoop().then(function() {
          $scope.getContacts().then(function() {
            $scope.$broadcast('closeProgressModal');
          });
          $scope.creationMode = false;
          $scope.selectedItems = [];
          $scope.singleSelectedItem = null;

        }, function(err) {
          console.log(err);
        });

      };

      // function invoked when delete button or key is pressed

      $scope.deleteAction = function() {
        // control goes to the confirmation modal
        if (!$scope.modalActive) {
          if ($scope.selectedItems.length) {
            $scope.$broadcast('openConfirmEvent');
          } else {
            $scope.addAlert('No contacts selected', 'error');
          }
        }
      };

      $scope.deleteSelected = function() {

        $scope.deleteMode = true;
        $scope.progressMax = $scope.selectedItems.length;

        var deleteLoop = function() {

          var deferred = $q.defer();
          var i = 0;
          var deletePromise;
          $scope.qtyResolved = 0;

          $scope.$watch('qtyResolved', function() {
            $scope.progressValue = ($scope.qtyResolved * 100 / $scope.progressMax).toFixed(2);
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
          $scope.getContacts().then(function() {
            $scope.$broadcast('closeProgressModal');
          });
          $scope.deleteMode = false;
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

      //delete key brings up the delete confirm modal
      $('body').keydown(function (e) {
        if (e.keyCode === 8 || e.keyCode === 46) {
          if (event.target.nodeName !== 'INPUT') {
            e.preventDefault();
            $scope.deleteAction();
            $scope.$apply();  // seems to be necessary to update the view with any alerts
          }
        }
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
