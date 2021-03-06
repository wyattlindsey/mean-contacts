'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
  firstName:            String,
  lastName:             String,
  phone:                String,
  email:                String,
  skype:                String,
  streetAddress:        String,
  secondaryAddress:     String,
  city:                 String,
  state:                String,
  zip:                  String,
  avatar:               String

});

module.exports = mongoose.model('Contact', ContactSchema);