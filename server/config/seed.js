/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Contact = require('../api/contact/contact.model');
var faker = require('./faker');

Contact.find({}).remove(function() {
  for(var i=0; i < 5; i++) {
    Contact.create({
      firstName:        faker.name.firstName(),
      lastName:         faker.name.lastName(),
      phone:            faker.phone.phoneNumber(),
      email:            faker.internet.email(),
      skype:            faker.internet.userName(),
      streeAddress:     faker.address.streetAddress(),
      secondaryAddress: faker.address.secondaryAddress(),
      cityStateZip:     faker.address.city() + ", " + faker.address.stateAbbr()
        + ", " + faker.address.zipCode(),
      avatar:           faker.internet.avatar()
    });
  }
});

var Thing = require('../api/thing/thing.model');


Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  },{
    name: 'Hi There',
    info: 'Have a great day!'
  });
});