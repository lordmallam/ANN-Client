'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:LoginCtrl
 * @description
 * # HeaderUserCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('HeaderUserCtrl', function (Shared, User, Auth, $location) {
    var vm = this;
    vm.user = User.getCurrentUser();
    if (!vm.user || Shared.isEmpty(vm.user.name)) {
      $location.path('/login');
    }
    vm.logout = () => {
      Auth.logout();
      $location.path('/login');
    };
  });
