'use strict';

describe('Controller: HandlerCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var HandlerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HandlerCtrl = $controller('HandlerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HandlerCtrl.awesomeThings.length).toBe(3);
  });
});
