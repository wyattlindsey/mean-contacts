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

  var formData = {};

  $scope.modalFormSubmit = function(modalForm) {

    formData = {
      firstName:      modalForm.firstName.$modelValue,
      lastName:       modalForm.lastName.$modelValue,
      phone:          modalForm.phone.$modelValue,
      email:          modalForm.email.$modelValue,
      skype:          modalForm.skype.$modelValue,
      street:         modalForm.street.$modelValue,
      cityStateZip:   modalForm.cityStateZip.$modelValue
    };


    $modalInstance.close(formData);
  };

  $scope.generateRandomPerson = function() {

    //clear the avatar for the next random person
    $('.modal-avatar img').remove();
    //clear the avatar from the temporary data model
    formData.avatar = null;

    $('input[name="firstName"]').val(faker.name.firstName());
    $('input[name="lastName"]').val(faker.name.lastName());
    $('input[name="phone"]').val(faker.phone.phoneNumber());
    $('input[name="email"]').val(faker.internet.email());
    $('input[name="skype"]').val(faker.internet.userName());
    $('input[name="street"]').val(faker.address.streetAddress());
    $('input[name="cityStateZip"]').val(faker.address.city() + ", " + faker.address.state()
                                          + ", " + faker.address.zipCode());
    // get image URL and append it to modal
    var imageURL = faker.internet.avatar();
    var avatarImageHTML = '<img src="' + imageURL + '" height="150" width="150" ' +
        'class="img-rounded">';
    $('.modal-avatar').html(avatarImageHTML);
    //add avatar to temporary data model
    formData.avatar = imageURL;


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