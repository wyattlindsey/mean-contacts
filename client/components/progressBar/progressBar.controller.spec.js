'use strict';

describe('Controller: ProgressBarCtrl', function () {

  // load the controller's module
  beforeEach(module('contactsApp'));

  var ProgressBarCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProgressbarCtrl = $controller('ProgressBarCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
