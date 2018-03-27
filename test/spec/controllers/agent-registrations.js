'use strict';

describe('Controller: AgentRegistrationsCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var AgentRegistrationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AgentRegistrationsCtrl = $controller('AgentRegistrationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AgentRegistrationsCtrl.awesomeThings.length).toBe(3);
  });
});
