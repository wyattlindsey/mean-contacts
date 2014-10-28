'use strict';

angular.module('contactsApp')
  .controller('ModalCtrl', function($scope, $modal) {

    $scope.openCreateDialog = function() {

      // Create button brings up this modal (see CreationModalInstanceCtrl controller below)

      $scope.$parent.modalActive = true;

      var creationModalInstance = $modal.open({
        templateUrl: './components/modal/creationModal.html',
        controller: 'CreationModalInstanceCtrl',
        scope: $scope,
        resolve: {}
      });

      creationModalInstance.result.then(function (data) {
        //result of clicking "Create"
        $scope.getContacts();
        $scope.createContactsBulk(data);
        $scope.$parent.modalActive = false;
      }, function () {
        // cancel
        $scope.$parent.modalActive = false;
      });
    };


    // Delete button or key brings up this modal (see ConfirmDeleteInstanceCtrl controller below)

    // so that grid controller (parent) can call openConfirmModalInstance(), namely for delete key event
    $scope.$on('openConfirmEvent', function(e) {
      $scope.openConfirmModalInstance();
    });

    // result of clicking 'Delete' button in main interace
    $scope.openConfirmModalInstance = function() {

        $scope.$parent.modalActive = true;

        var confirmModalInstance = $modal.open({
          templateUrl: './components/modal/confirmModal.html',
          controller: 'ConfirmDeleteInstanceCtrl',
          resolve: {}
        });

        confirmModalInstance.result.then(function (data) {
          //result of clicking "Delete"
          $scope.deleteSelected();
          $scope.$parent.modalActive = false;
        }, function () {
          // cancel
          $scope.gridApi.selection.setMultiSelect(false);
          $scope.gridOptions.multiSelect = false;
          $scope.$parent.modalActive = false;
        });

    };

    // progress modal
    $scope.openProgressModal = function(qty) {
      $scope.progressQty = qty;
      var progressModal = $modal.open({
        templateUrl: './components/modal/progressModal.html',
        controller: 'ProgressModalInstanceCtrl',
        resolve: {},
        keyboard: false,
        backdrop: 'static'
      });

      return progressModal.close;
    };
  });

angular.module('contactsApp').controller('CreationModalInstanceCtrl', function($scope, $modalInstance) {

  $scope.formData = [];

  $scope.modalFormSubmit = function(modalForm) {


    // pull from data for first member in random people array
    $scope.formData[0] = {
      firstName:        modalForm.firstName.$modelValue,
      lastName:         modalForm.lastName.$modelValue,
      phone:            modalForm.phone.$modelValue,
      email:            modalForm.email.$modelValue,
      skype:            modalForm.skype.$modelValue,
      streetAddress:    modalForm.streetAddress.$modelValue,
      secondaryAddress: modalForm.secondaryAddress.$modelValue,
      city:             modalForm.city.$modelValue,
      state:            modalForm.state.$modelValue,
      zip:              modalForm.zip.$modelValue,
      avatar:           $scope.formData.avatar
    };

    // additional random entries beyond the form data
    for (var i = 1; i < $scope.qty; i++) {
      $scope.formData[i] = {};
      $scope.formData[i].firstName = faker.name.firstName();
      $scope.formData[i].lastName = faker.name.lastName();
      $scope.formData[i].phone = faker.phone.phoneNumber();
      $scope.formData[i].email = faker.internet.email();
      $scope.formData[i].userName = faker.internet.userName();
      $scope.formData[i].firstName = faker.name.firstName();
      $scope.formData[i].streetAddress = faker.address.streetAddress();
      if (Math.random() > 0.6) {
        $scope.formData[i].secondaryAddress = faker.address.secondaryAddress();
      } else {
        $scope.formData[i].secondaryAddress = '';
      }
      $scope.formData[i].city = faker.address.city();
      $scope.formData[i].state = faker.address.stateAbbr();
      $scope.formData[i].zip = faker.address.zipCode();
      $scope.formData[i].avatar = faker.internet.avatar();
    }

    $scope.$parent.modalActive = false;
    // send final formData to the main modal controller
    $modalInstance.close($scope.formData);
  };

  $scope.generateRandomPerson = function(qty) {

    //clear the avatar for the next random person
    $('.modal-avatar img').remove();

    $scope.qty = qty; // get qty value from form
    if (!$scope.qty) {
      $scope.qty = 1;
    }

    // push values from faker.js to the current for fields

    $('input[name="firstName"]').val(faker.name.firstName());
    $('input[name="lastName"]').val(faker.name.lastName());
    $('input[name="phone"]').val(faker.phone.phoneNumber());
    $('input[name="email"]').val(faker.internet.email());
    $('input[name="skype"]').val(faker.internet.userName());
    $('input[name="streetAddress"]').val(faker.address.streetAddress());
    if (Math.random() > 0.6) {
      $('input[name="secondaryAddress"]').val(faker.address.secondaryAddress());
    } else {
      $('input[name="secondaryAddress"]').val('');
    }
    $('input[name="city"]').val(faker.address.city());
    $('input[name="state"]').val(faker.address.stateAbbr());
    $('input[name="zip"]').val(faker.address.zipCode());
    // get image URL and append it to modal
    var imageURL = faker.internet.avatar();
    var avatarImageHTML = '<img src="' + imageURL + '" height="150" width="150" ' +
        'class="img-rounded">';
    $('.modal-avatar').html(avatarImageHTML);
    //add avatar to temporary data model
    $scope.formData.avatar = imageURL;

    // very dirty hack that updates angular's model of the form data with what
    // was just put in the view
    $('.contacts-modal-body input:visible, #my-form select:visible').each(function(){
      $(this).trigger('input');
    });


  };

  $scope.modalCancelButton = function() {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('contactsApp').controller('ConfirmDeleteInstanceCtrl', function($scope, $modalInstance) {

  $scope.modalCancelButton = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.modalConfirmButton = function() {
    $modalInstance.close();
  };



});

angular.module('contactsApp').controller('ProgressModalInstanceCtrl', function($scope, $modalInstance) {

});