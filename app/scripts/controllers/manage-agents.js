'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:ManageAgentsCtrl
 * @description
 * # ManageAgentsCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('ManageAgentsCtrl', function (Api, toastr) {
    const vm = this;
    vm.currentPage = 1;
    vm.pageSize = 10;
    Api.getByAction('users', 'agents')
      .then(res => {
        vm.agents = res;
      })
      .catch(err => {
        console.log(err)
        err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
          toastr.error(err.message, err.error)
      })

    vm.delete = user => {
      Api.getByActionId('users', 'remove-agent', user.member)
        .then(res => {
          toastr.success(`${user.firstname} is no longer an agent`, 'Agent removed')
          vm.agents = res;
        })
        .catch(err => {
          err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
            toastr.error(err.message, err.error)
          console.log(err);
        })
    };
  });
