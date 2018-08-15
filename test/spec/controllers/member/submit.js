'use strict';

describe('Controller: MemberSubmitCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var MemberSubmitCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MemberSubmitCtrl = $controller('MemberSubmitCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MemberSubmitCtrl.awesomeThings.length).toBe(3);
  });
});
