'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:RequestResetCtrl
 * @description
 * # RequestResetCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('RequestResetCtrl', function (Shared, Api, $location) {
    const vm = this;

    vm.reset = () => {
      vm.error = ''
      if(!Shared.isEmpty(vm.email)) {
        Api.addByAction('members', 'request-password-reset', { id: vm.email })
        .then(res => {
          Shared.setSubmitParams('Password Reset Request',
          'A password reset email has been sent to the email address provided. Please check your email and follow the link to reset your password.', false)
          $location.path('/submit')
        })
        .catch(err => {
          vm.error = err.data && err.data.error
        })
      } else {
        vm.error = 'Enter your email address used to register your account.';
      }
    }
  });
