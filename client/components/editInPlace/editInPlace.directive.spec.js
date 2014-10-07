'use strict';

describe('Directive: editInPlace', function () {

  // load the directive's module
  beforeEach(module('contactsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-in-place></edit-in-place>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the editInPlace directive');
  }));
});