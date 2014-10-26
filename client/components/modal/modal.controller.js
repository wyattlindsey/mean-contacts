'use strict';

angular.module('contactsApp')
  .controller('ModalCtrl', function($scope, $modal, $timeout) {


    $scope.openCreateDialog = function() {

      var creationModalInstance = $modal.open({
        templateUrl: './components/modal/creationModal.html',
        controller: 'CreationModalInstanceCtrl',
        scope: $scope,
        resolve: {}
      });

      creationModalInstance.result.then(function (data) {
        // result of clicking "Create"


//        $scope.progressBarMax = 100000;
//        for (var i = 0; i < 100000; i++) {
//          $scope.progressBarValue = i;
//          $timeout(function()
//          {
//            $scope.progress_bar_style = {  "width": i+'%'  };
//          }, 1000);
//          console.log(i);
//        }

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
          $scope.gridApi.selection.setMultiSelect(false);
          $scope.gridOptions.multiSelect = false;
        });
    };
  });

angular.module('contactsApp').controller('CreationModalInstanceCtrl', function($scope, $modalInstance, $timeout) {

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
      console.log('created additional entry');
      console.log($scope.qty);
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
      console.log($scope.formData[i].avatar);
    }

//    var data = $scope.formData;
//
//    for (var i = 0; i < data.length; i++) {
//      $scope.addContact(data[i]).then(function (data) {
//        $scope.getContacts().then(function () {
//          $scope.selectSingleRow(data[i]);
//          $scope.progressValue = i+1;
//        });
//      });
//    }


    $modalInstance.close($scope.formData);
  };

  $scope.generateRandomPerson = function(qty) {

    //clear the avatar for the next random person
    $('.modal-avatar img').remove();
    //clear the avatar from the temporary data model
//    $scope.formData.avatar = null;

    $scope.qty = qty; // get qty value from form
    if (!$scope.qty) {
      $scope.qty = 1;
    }


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
    $scope.formData[0] = {};
    console.log(imageURL);
    $scope.formData[0].avatar = imageURL;


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

  //can't seem to get the items to list out in the confirm dialog

  $scope.modalCancelButton = function() {
    $modalInstance.dismiss('cancel');
    console.log('cancel');
  };

  $scope.modalConfirmButton = function() {
    console.log('beleted');
    $modalInstance.close();
  };



});