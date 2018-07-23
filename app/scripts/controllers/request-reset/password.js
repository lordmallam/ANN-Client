'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:RequestResetPasswordCtrl
 * @description
 * # RequestResetPasswordCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('RequestResetPasswordCtrl', function (Shared, Api, $routeParams, $location) {
    const vm = this
    vm.error = ''
    const token = $routeParams.token || null

    if (!token) {
      $location.path('/login');
    }

    vm.reset = () => {
      vm.error = ''
      if (!Shared.isEmpty(vm.password)) {
        if (vm.password.length > 6) {
          if (vm.password === vm.confirm) {
            Api.addByAction('members', 'password-reset', { token, password: vm.password })
            .then(res => {
              console.log(res)
              Shared.setSubmitParams('Password Reset Successfully',
                'Your password has been reset. Use your new password to login', true)
                $location.path('/submit')
            })
            .catch(err => {
              vm.error = err.data && err.data.error
            })
          } else {
            vm.error = 'Passwords mismatched.'
          }
        } else {
          vm.error = 'Password must be over 6 characters.'
        }
      } else {
        vm.error = 'Enter a new password. Must be over 6 characters.'
      }
    }
  });
