'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:AgentRegistrationsCtrl
 * @description
 * # AgentRegistrationsCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('AgentRegistrationsCtrl', function (Shared, Api, toastr) {
    var vm = this;
    vm.prospects = [];
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
        Api.all('prospects')
          .then(res => {
            vm.prospects = res.map(rec => (rec.doc))
            vm.prospects = _.reverse(_.sortBy(vm.prospects, (o) => (
              new Date(o.modifiedOn)
            )));
          })
          .catch(err => {
            console.log(err)
            err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
              toastr.error(err.message, err.error)
          })
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

    vm.decline = prospect => {
      Api.getByActionId('prospects', 'decline', prospect._id)
        .then(res => {
          vm.prospects = res.map(rec => (rec.doc))
          vm.prospects = _.reverse(_.sortBy(vm.prospects, (o) => (
            new Date(o.modifiedOn)
          )));
          toastr.success(`${prospect.firstname} ${prospect.surname} was declined`, 'Decline');
        })
        .catch(err => {
          console.log(err);
          err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
            toastr.error(err.message, err.error)
        });
    };

    vm.approve = prospect => {
      Api.getByActionId('prospects', 'approve', prospect._id)
        .then(res => {
          vm.prospects = res.map(rec => (rec.doc))
          vm.prospects = _.reverse(_.sortBy(vm.prospects, (o) => (
            new Date(o.modifiedOn)
          )));
          toastr.success(`${prospect.firstname} ${prospect.surname} was approved`, 'Approval');
        })
        .catch(err => {
          console.log(err);
          err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
            toastr.error(err.message, err.error)
        })
    };
  });
