'use strict';

describe('Controller: NewMemberCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var NewMemberCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewMemberCtrl = $controller('NewMemberCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewMemberCtrl.awesomeThings.length).toBe(3);
  });
});
