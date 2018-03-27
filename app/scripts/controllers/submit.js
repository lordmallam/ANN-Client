'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:SubmitCtrl
 * @description
 * # SubmitCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('SubmitCtrl', function ($location) {
    var vm = this;
    vm.gotoLogin = () => {
      $location.path('/login');
    };
  });
