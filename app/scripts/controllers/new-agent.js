'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:NewAgentCtrl
 * @description
 * # NewAgentCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('NewAgentCtrl', function (Api, Shared) {
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
      Api.getByActionId('members', 'by-email', vm.searchText)
        .then(res => {
          vm.members = [res]
        })
        .catch(err => console.log(err))
    };

    vm.assign = member => {
      console.log(member)
    };
  });
