'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:LoginCtrl
 * @description
 * # HeaderUserCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('SideBarCtrl', function (Shared, User, Auth, $location) {
    var vm = this;
    var user = User.getCurrentUser();
    var roles = user && user.roles;
    vm.isPage = page => ($location.path() === page);
    vm.isAdmin = () => {
      return roles && roles.includes('Admin');
    };
    vm.isAgent = () => {
      return roles && roles.includes('Agent');
    };
  });
