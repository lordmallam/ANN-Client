'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:AdminProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('AdminProfileCtrl', function (User, Shared, Api, $scope, $routeParams) {
    var vm = this;
    var member = User.getCurrentUser();
    var id = $routeParams.id;
    Api.getById('members', id)
      .then(res => {
        vm.member = res;
        vm.photo = vm.member._attachments && vm.member._attachments['profile-pic.png'] && vm.member._attachments['profile-pic.png'].data ?
          Shared.byteToImage(vm.member._attachments['profile-pic.png'].data) : '../../images/white-image.png';
        vm.state = '';
        vm.lga = '';
        Shared.getStates()
          .then(stateList => {
            const state = _.first(stateList.filter(rec => (rec._id === vm.member.state)))
            vm.state = state && state.name
          })
          .catch();
        Shared.getLGAs()
          .then(lgaList => {
            const lga = _.first(lgaList.filter(rec => (rec._id === vm.member.lga)))
            vm.lga = lga && lga.name
            $scope.$apply();
          })
          .catch();
      })
      .catch(err => {
        console.log(err);
        err.data ? toastr.error(err.data && err.data.message, err.data && err.data.error) :
          toastr.error(err.message, err.error)
      });
  });
