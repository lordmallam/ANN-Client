'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:NewAgentCtrl
 * @description
 * # NewAgentCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('NewAgentCtrl', function (Api, Shared, toastr, $location) {
    const vm = this;
    vm.members = [];
    vm.stateList = [];
    vm.lgaList = [];

    Shared.getStates()
      .then(stateList => {
        vm.stateList = stateList;
      })
      .catch();

    Shared.getLGAs()
      .then(lgaList => {
        vm.lgaList = lgaList;
      })
      .catch();


    vm.getState = stateId => {
      const state = _.first(vm.stateList.filter(rec => (rec._id === stateId)));
      return state && state.name || '---'
    };

    vm.getLGA = lgaId => {
      const lga = _.first(vm.lgaList.filter(rec => (rec._id === lgaId)));
      return lga && lga.name || '---'
    };

    vm.getStatus = status => {
      if (status === 'completed') {
        return 'Active';
      } else if (status === 'started') {
        return 'Started';
      } else if (status === 'inactive') {
        return 'Inactive';
      }
    };

    vm.search = event => {
      if (Shared.isEmpty(vm.searchText)) {
        toastr.error('Enter email to search', 'Empty Field')
        return
      }
      Api.getByActionId('members', 'by-email', vm.searchText)
        .then(res => {
          vm.members = [res]
        })
        .catch(err => {
          err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
            toastr.error(err.message, err.error)
          console.log(err);
        })
    };

    vm.assign = member => {
      Api.getByActionId('users', 'assign-agent', member._id)
        .then(res => {
          toastr.success(`${member.firstname} is now an agent`, 'Agent assigned')
          $location.path('/manage-agents');
        })
        .catch(err => {
          err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
            toastr.error(err.message, err.error)
          console.log(err);
        })
    };
  });
