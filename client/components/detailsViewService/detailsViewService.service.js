'use strict';

angular.module('contactsApp')
  .service('detailsViewService', function() {


    this.clearDetailsView = function() {

      var imageURL = 'http://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
      var avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
          'class="img-rounded">';
      $('.contact-pane-avatar').html(avatarImageHTML);
      $('.contact-name').html('');
      $('.contact-phone').html('');
      $('.contact-email').html('');
      $('.contact-skype').html('');
      $('.contact-street-address').html('');
      $('.contact-secondary-address').html('');
      $('.contact-city-state').html('');
      $('.contact-zip').html('');
    };

    this.setDetailsView = function(contactData) {
      if (contactData.avatar) {
        var avatarImageHTML = '<img src="' + contactData.avatar + '" height="250" width="250" ' +
            'class="img-rounded">';
        $('.contact-pane-avatar').html(avatarImageHTML);
      }
      var nameHTML = contactData.firstName + ' ' + contactData.lastName;
      $('.contact-name').html(nameHTML);
      $('.contact-phone').html(contactData.phone);
      $('.contact-email').html(contactData.email);
      $('.contact-skype').html(contactData.skype);
      $('.contact-street-address').html(contactData.streetAddress);
      $('.contact-secondary-address').html(contactData.secondaryAddress);
      if (contactData.city || contactData.state) {
        var cityStateHTML = contactData.city + ', ' + contactData.state;
        $('.contact-city-state').html(cityStateHTML);
        $('.contact-zip').html(contactData.zip);
      }
    };




  });