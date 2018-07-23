'use strict';

describe('Controller: RequestResetPasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var RequestResetPasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestResetPasswordCtrl = $controller('RequestResetPasswordCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RequestResetPasswordCtrl.awesomeThings.length).toBe(3);
  });
});
