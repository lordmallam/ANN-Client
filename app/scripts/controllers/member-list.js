'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:MemberListCtrl
 * @description
 * # MemberListCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('MemberListCtrl', function (Shared, Api, toastr) {
    var vm = this;
    vm.members = [];
    vm.stateList = [];
    vm.lgaList = [];
    vm.currentPage = 1;
    vm.pageSize = 30;

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
      .catch(err => {
        console.log(err);
        toastr.error('Could not connect to server', 'Connection Error')
      });
  

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
      Api.deleted('members', member._id)
        .then(res => {
          toastr.success(`${member.firstname} ${member.surname} deleted`, 'Deleted');
          Api.all('members')
            .then(res => {
              vm.members = res.map(rec => (rec.doc))
            })
            .catch(err => console.log(err))
        })
        .catch(err => {
          console.log(err);
          err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
            toastr.error(err.message, err.error)
        })
    };
  });
