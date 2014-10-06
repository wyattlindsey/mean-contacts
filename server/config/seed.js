/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Contact = require('../api/contact/contact.model');
var faker = require('./faker');

Contact.find({}).remove(function() {
  for(var i=0; i < 25; i++) {
    Contact.create({
      firstName:        faker.name.firstName(),
      lastName:         faker.name.lastName(),
      phone:            faker.phone.phoneNumber(),
      email:            faker.internet.email(),
      skype:            faker.internet.userName(),
      streetAddress:     faker.address.streetAddress(),
      secondaryAddress: faker.address.secondaryAddress(),
      city:             faker.address.city(),
      state:            faker.address.stateAbbr(),
      zip:              faker.address.zipCode(),
      avatar:           faker.internet.avatar()
    });
  }
});