'use strict';

angular.module('contactsApp')
  .controller('ModalCtrl', function($scope, $modal) {

    $scope.open = function() {

      var modalInstance = $modal.open({
        templateUrl: './components/modal/modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {}
      });

      modalInstance.result.then(function (data) {
        // ok
        $scope.addContact(data);
      }, function () {
        // cancel
      });

      // trying to get focus on first form field every time, not just the first
      // so far, no luck
      modalInstance.opened.then(function() {
        $('.contacts-modal').on('shown.bs.modal', function(){
          $(this).find('input:text:visible:first').focus();
        });
      });
    };

  });

angular.module('contactsApp').controller('ModalInstanceCtrl', function($scope, $modalInstance, $http) {



  $scope.modalFormSubmit = function(modalForm) {

    var formData = {
      firstName:      modalForm.firstName.$modelValue,
      lastName:       modalForm.lastName.$modelValue,
      phone:          modalForm.phone.$modelValue,
      email:          modalForm.email.$modelValue,
      skype:          modalForm.skype.$modelValue,
      street:         modalForm.street.$modelValue,
      cityStateZip:   modalForm.cityStateZip.$modelValue,
      country:        modalForm.country.$modelValue
    };

    $modalInstance.close(formData);
  };

  $scope.modalCancelButton = function() {
    $modalInstance.dismiss('cancel');
  };
});