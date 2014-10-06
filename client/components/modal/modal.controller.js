'use strict';

angular.module('contactsApp')
  .controller('ModalCtrl', function($scope, $modal, detailsViewService) {

    $scope.open = function() {

      var modalInstance = $modal.open({
        templateUrl: './components/modal/modal.html',
        controller: 'ModalInstanceCtrl',
        resolve: {}
      });

      modalInstance.result.then(function (data) {
        //result of clicking "Create"
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

  $scope.formData = {};

  $scope.modalFormSubmit = function(modalForm) {

    $scope.formData = {
      firstName:        modalForm.firstName.$modelValue,
      lastName:         modalForm.lastName.$modelValue,
      phone:            modalForm.phone.$modelValue,
      email:            modalForm.email.$modelValue,
      skype:            modalForm.skype.$modelValue,
      streetAddress:    modalForm.streetAddress.$modelValue,
      secondaryAddress: modalForm.secondaryAddress.$modelValue,
      cityStateZip:     modalForm.cityStateZip.$modelValue,
      avatar:           $scope.formData.avatar
    };

    $modalInstance.close($scope.formData);
  };

  $scope.generateRandomPerson = function() {

    //clear the avatar for the next random person
    $('.modal-avatar img').remove();
    //clear the avatar from the temporary data model
    $scope.formData.avatar = null;

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
    $('input[name="cityStateZip"]').val(faker.address.city() + ", " + faker.address.stateAbbr()
                                          + ", " + faker.address.zipCode());
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