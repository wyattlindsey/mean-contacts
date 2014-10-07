'use strict';

describe('Controller: DetailsviewCtrl', function () {

  // load the controller's module
  beforeEach(module('contactsApp'));

  var DetailsviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailsviewCtrl = $controller('DetailsviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
