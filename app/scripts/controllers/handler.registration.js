'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:HandlerCtrl
 * @description
 * # HandlerCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('HandlerRegCtrl', function (Shared, $location, Api) {
    const vm = this;
    vm.message = '';

    vm.user = Shared.getRegisteringUser();
    if (vm.user === null) {
      $location.path('/register');
    }

    vm.sendActivationMail = () => {
      vm.message = '';
      Api.getByAction('members', `register/resend/${vm.user._id}`)
        .then(res => {
          vm.message = res;
        })
        .catch(err => {
          if (err.data) {
            vm.message = err.data.message;
          } else {
            vm.message = err;
          }          
        });
    };
  });
