'use strict';

describe('Controller: MemberListCtrl', function () {

  // load the controller's module
  beforeEach(module('annClientApp'));

  var MemberListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MemberListCtrl = $controller('MemberListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MemberListCtrl.awesomeThings.length).toBe(3);
  });
});
