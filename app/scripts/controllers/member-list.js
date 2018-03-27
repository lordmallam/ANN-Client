'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:MemberListCtrl
 * @description
 * # MemberListCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('MemberListCtrl', function (Shared, Api) {
    var vm = this;
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
        Api.all('members')
          .then(res => {
            vm.members = res.map(rec => (rec.doc))
          })
          .catch(err => console.log(err))
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

    vm.delete = member => {
      console.log(member)
    };
  });
