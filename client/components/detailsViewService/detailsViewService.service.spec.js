'use strict';

describe('Service: detailsViewService', function () {

  // load the service's module
  beforeEach(module('contactsApp'));

  // instantiate service
  var detailsViewService;
  beforeEach(inject(function (_detailsViewService_) {
    detailsViewService = _detailsViewService_;
  }));

  it('should do something', function () {
    expect(!!detailsViewService).toBe(true);
  });

});
