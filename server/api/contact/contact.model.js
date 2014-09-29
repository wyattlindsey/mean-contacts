'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
  firstName:    String,
  lastName:     String,
  phone:        String,
  email:        String,
  skype:        String,
  street:       String,
  cityStateZip: String,
  country:      String

});

module.exports = mongoose.model('Contact', ContactSchema);