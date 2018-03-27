'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:MobileCtrl
 * @description
 * # MobileCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('MobileCtrl', function ($routeParams, $location, Api, Shared) {
    const vm = this;
    const activationCode = $routeParams.ac;
    if (!activationCode) {
      $location.path('/');
    }
    vm.isLoading = true;
    Api.getByAction('members', `register/activation/${activationCode}`)
      .then(res => {
        vm.isLoading = false;
        console.log(res);
        vm.member = res;
      })
      .catch(err => console.log(err));

    const isInfoDataValid = () => {
      vm.errorfields = '';
      let result = true;
      if (Shared.isEmpty(vm.member.firstname)) {
        vm.errorfields += 'First Name';
        result = false;
      }
      if (Shared.isEmpty(vm.member.surname)) {
        vm.errorfields += ', Surname';
        result = false;
      }
      if (Shared.isEmpty(vm.member.dateOfBirth)) {
        vm.errorfields += ', Date of Birth';
        result = false;
      }
      if (Shared.isEmpty(vm.member.sex)) {
        vm.errorfields += ', Sex';
        result = false;
      }
      if (Shared.isEmpty(vm.member.phone)) {
        vm.errorfields += ', Phone Number';
        result = false;
      }
      if (Shared.isEmpty(vm.member.email)) {
        vm.errorfields += ', Email';
        result = false;
      }
      if (Shared.isEmpty(vm.member.state)) {
        vm.errorfields += ', State';
        result = false;
      }
      if (Shared.isEmpty(vm.member.lga)) {
        vm.errorfields += ', Local Government';
        result = false;
      }
      if (Shared.isEmpty(vm.member.residenceAddress)) {
        vm.errorfields += ', Residence Address';
        result = false;
      }

      return result;
    };

    vm.activate = () => {
      if (isInfoDataValid()) {
        Api.edit(`members/register/activation/${activationCode}`, vm.member)
          .then(res => {
            $location.path('/submit');
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        $location.path("/login")
      }
    };
  });
