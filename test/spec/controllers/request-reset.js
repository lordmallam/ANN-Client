'use strict';

describe('Controller: RequestResetCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var RequestResetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestResetCtrl = $controller('RequestResetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RequestResetCtrl.awesomeThings.length).toBe(3);
  });
});
