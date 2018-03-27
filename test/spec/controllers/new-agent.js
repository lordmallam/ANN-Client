'use strict';

describe('Controller: NewAgentCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var NewAgentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewAgentCtrl = $controller('NewAgentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewAgentCtrl.awesomeThings.length).toBe(3);
  });
});
