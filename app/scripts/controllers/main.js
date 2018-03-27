'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('MainCtrl', function () {
    const vm = this;
    const awesome = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    vm.awesomethings = awesome;
  });
