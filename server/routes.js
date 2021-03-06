/**
 * Main application routes
 */

'use strict';

var fs = require('fs');
var replaceStream = require('replacestream');
var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/contacts', require('./api/contact'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);


  app.route('/contacts')
      .get(function(req, res) {
        // rewrite script element in <head> using replacestream
        // workaround to get New Relic browser timing to work with pre-compiled Jade
        // templates from Angular -> Grunt
        var nrHeader = newrelic.getBrowserTimingHeader();
        fs.createReadStream(app.get('appPath') + '/index.html')
            .pipe(replaceStream('<script id="nr"></script>', nrHeader))
            .pipe(res);
      });

//  All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
