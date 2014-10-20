'use strict';

angular.module('contactsApp')
  .controller('ModalCtrl', function($scope, $modal) {


    $scope.openCreateDialog = function() {

      var creationModalInstance = $modal.open({
        templateUrl: './components/modal/creationModal.html',
        controller: 'CreationModalInstanceCtrl',
        scope: $scope,
        resolve: {}
      });

      creationModalInstance.result.then(function (data) {
        //result of clicking "Create"
        for (var i = 0; i < data.length; i++) {
          $scope.addContact(data[i]).then(function (data) {
            $scope.getContacts().then(function () {
              $scope.selectSingleRow(data[i]);
            });
          });
        }
//        $scope.addContact(data).then(function(data) {
//          $scope.getContacts().then(function() {
//            $scope.selectSingleRow(data);
//          });
//        });
      }, function () {
        // cancel
      });

      // trying to get focus on first form field every time, not just the first
      // so far, no luck
      creationModalInstance.opened.then(function() {
        $('.contacts-modal').on('shown.bs.modal', function(){
          $(this).find('input:text:visible:first').focus();
        });
      });
    };


    // so that grid controller (parent) can call openConfirmModalInstance()
    $scope.$on('openConfirmEvent', function(e) {
      $scope.openConfirmModalInstance();
    });

    $scope.openConfirmModalInstance = function() {

      var confirmModalInstance = $modal.open({
        templateUrl: './components/modal/confirmModal.html',
        controller: 'ConfirmDeleteInstanceCtrl',
        resolve: {}
      });

      confirmModalInstance.result.then(function (data) {
          //result of clicking "Delete"
          $scope.deleteSelected($scope.selectedItems);
        }, function () {
          // cancel
          console.log($scope.selectedItems);
          $scope.gridApi.selection.setMultiSelect(false);
          $scope.gridOptions.multiSelect = false;
        });
    };
  });

angular.module('contactsApp').controller('CreationModalInstanceCtrl', function($scope, $modalInstance) {

  $scope.formData = {};

  $scope.modalFormSubmit = function(modalForm) {



//      $scope.formData = {
//        firstName:        modalForm.firstName.$modelValue,
//        lastName:         modalForm.lastName.$modelValue,
//        phone:            modalForm.phone.$modelValue,
//        email:            modalForm.email.$modelValue,
//        skype:            modalForm.skype.$modelValue,
//        streetAddress:    modalForm.streetAddress.$modelValue,
//        secondaryAddress: modalForm.secondaryAddress.$modelValue,
//        city:             modalForm.city.$modelValue,
//        state:            modalForm.state.$modelValue,
//        zip:              modalForm.zip.$modelValue,
//        avatar:           $scope.formData.avatar
//      };



    console.log($scope.formData.Length);
    $modalInstance.close($scope.formData);
  };

  $scope.generateRandomPerson = function(qty) {

    //clear the avatar for the next random person
    $('.modal-avatar img').remove();
    //clear the avatar from the temporary data model
    $scope.formData.avatar = null;

    if (!qty) {
      qty = 1;
    }

    for (var i = 0; i < qty; i++) {
      $scope.formData[i] = {};
      $scope.formData[i].firstName = 'Wyatt';
    }

    console.log($scope.formData);

//    $('input[name="firstName"]').val(faker.name.firstName());
//    $('input[name="lastName"]').val(faker.name.lastName());
//    $('input[name="phone"]').val(faker.phone.phoneNumber());
//    $('input[name="email"]').val(faker.internet.email());
//    $('input[name="skype"]').val(faker.internet.userName());
//    $('input[name="streetAddress"]').val(faker.address.streetAddress());
//    if (Math.random() > 0.6) {
//      $('input[name="secondaryAddress"]').val(faker.address.secondaryAddress());
//    } else {
//      $('input[name="secondaryAddress"]').val('');
//    }
//    $('input[name="city"]').val(faker.address.city());
//    $('input[name="state"]').val(faker.address.stateAbbr());
//    $('input[name="zip"]').val(faker.address.zipCode());
//    // get image URL and append it to modal
//    var imageURL = faker.internet.avatar();
//    var avatarImageHTML = '<img src="' + imageURL + '" height="150" width="150" ' +
//        'class="img-rounded">';
//    $('.modal-avatar').html(avatarImageHTML);
//    //add avatar to temporary data model
//    $scope.formData.avatar = imageURL;


    // very dirty hack that updates angular's model of the form data with what
    // was just put in the view
//    $('.contacts-modal-body input:visible, #my-form select:visible').each(function(){
//      $(this).trigger('input');
//    });
  };

  $scope.modalCancelButton = function() {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('contactsApp').controller('ConfirmDeleteInstanceCtrl', function($scope, $modalInstance) {

  //can't seem to get the items to list out in the confirm dialog
  console.log($scope.selectedItems);
  $scope.modalCancelButton = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.modalConfirmButton = function() {
    $modalInstance.close();
  };



});