'use strict';

describe('Controller: GridctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('contactsApp'));

  var GridctrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GridctrlCtrl = $controller('GridctrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
