'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('LoginCtrl', function (Shared, Api, Auth, $location, User, toastr) {
    var vm = this;
    Api.all('states')
      .then(res => {
        Shared.setStates(res.map(rec=>(rec.doc)));
      })
      .catch();
    Api.all('lgas')
      .then(res => {
        Shared.setLGAs(res.map(rec => (rec.doc)));
      })
      .catch();

    vm.login = () => {
      if (!Shared.isEmpty(vm.email) && !Shared.isEmpty(vm.password)) {
        var user = {
          username: vm.email,
          password: vm.password
        };
        Auth.login(user)
          .then(res => {
            var roles = Shared.getUserFriendlyRoles(res.roles);
            Api.getById('members', res.member)
              .then(resMem => {
                res.member = resMem;
                res.roles = roles;
                User.setCurrentUser(res);
                $location.path('/profile');
              })
              .catch(err => {
                toastr.error(err.data && err.data.message, err.data && err.data.error);
                console.log(err)
              });
          })
          .catch(err => {
            err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
            toastr.error(err.message, err.error)
            vm.error = err.message;
            vm.password = '';
          });
      } else {
        vm.error = 'Enter your email and password to login';
      }
    };
  });
