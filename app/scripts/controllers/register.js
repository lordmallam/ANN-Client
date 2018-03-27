'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('RegisterCtrl', function (Shared, Api, $location, toastr) {
    const vm = this;
    vm.error = '';

    vm.signUp = () => {
      vm.error = '';
      if (formIsValid()) {
        if (Shared.isValidEmail(vm.email)) {
          const payload = {
            firstname: vm.firstName,
            surname: vm.surname,
            email: vm.email,
            password: vm.password
          };
          Api.addByAction('members', 'register', payload)
            .then(res => {
              console.log(res);
              Shared.setRegisteringUser(res);
              $location.path('/handler/registration');
            })
            .catch(err => { 
              console.log(err);
              toastr.error(err.data && err.data.message, err.data && err.data.error)
              vm.error = err.data && err.data.message;
            });
        } else {          
          vm.error = 'Enter a valid email address.';
          toastr.error(vm.error, 'Fake email')
        }
      } else {
        vm.error = 'Fill all fields to continue your registration';
        toastr.warning(vm.error, 'Invalid form')
      };
    };

    const formIsValid = () => (!Shared.isEmpty(vm.firstName) && !Shared.isEmpty(vm.surname) && !Shared.isEmpty(vm.email)
      && !Shared.isEmpty(vm.password));
  });
