'use strict';

angular.module('contactsApp')
  .service('detailsViewService', function() {


    this.clearDetailsView = function() {

      var imageURL = 'http://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
      var avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
          'class="img-rounded">';
      $('.contact-pane-avatar').html(avatarImageHTML);
    };

    this.setAvatarImage = function(imageURL) {
      var avatarImageHTML = '<img src="' + imageURL + '" height="250" width="250" ' +
          'class="img-rounded">';
      $('.contact-pane-avatar').html(avatarImageHTML);
    };


  });