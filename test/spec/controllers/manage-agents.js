'use strict';

describe('Controller: ManageAgentsCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var ManageAgentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageAgentsCtrl = $controller('ManageAgentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageAgentsCtrl.awesomeThings.length).toBe(3);
  });
});
