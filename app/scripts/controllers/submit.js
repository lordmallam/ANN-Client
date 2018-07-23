'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:SubmitCtrl
 * @description
 * # SubmitCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('SubmitCtrl', function (Shared, $location) {
    var vm = this;
    const params = Shared.getSubmitParams()
    vm.header = params.header || 'Registration Completed!'
    vm.body = params.body || 'Login to your profile either on the web using the link below or on our user friendly mobile apps'
    vm.loginButton = params.loginButton || false
    vm.gotoLogin = () => {
      $location.path('/login');
    };
  });
