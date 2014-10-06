'use strict';

angular.module('contactsApp')
  .service('detailsViewService', function() {


    this.clearDetailsView = function() {

      var imageURL = 'http://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
      var avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
          'class="img-rounded">';
      $('.contact-pane-avatar').html(avatarImageHTML);
      $('.contact-name').html('');
    };

    this.setDetailsView = function(contactData) {
      var avatarImageHTML = '<img src="' + contactData.avatar + '" height="250" width="250" ' +
          'class="img-rounded">';
      $('.contact-pane-avatar').html(avatarImageHTML);

      var nameHTML = contactData.firstName + ' ' + contactData.lastName;
      $('.contact-name').html(nameHTML);
      $('.contact-phone').html(contactData.phone);
      $('.contact-email').html(contactData.email);
      $('.contact-skype').html(contactData.skype);
      $('.contact-street-address').html(contactData.streetAddress);
      $('.contact-secondary-address').html(contactData.secondaryAddress);
      $('.contact-city-state-zip').html(contactData.cityStateZip);
    };


  });