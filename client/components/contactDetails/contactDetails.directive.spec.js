'use strict';

describe('Directive: contactDetails', function () {

  // load the directive's module and view
  beforeEach(module('contactsApp'));
  beforeEach(module('components/contactDetails/contactDetails.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<contact-details></contact-details>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the contactDetails directive');
  }));
});