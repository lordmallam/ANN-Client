'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('ProfileCtrl', function (User, Shared, Api, $scope) {
    var vm = this;
    var user = User.getCurrentUser();
    vm.member = user.member;
    vm.photo = vm.member._attachments && vm.member._attachments['profile-pic.png'] && vm.member._attachments['profile-pic.png'].data ?
      Shared.byteToImage(vm.member._attachments['profile-pic.png'].data) : '../../images/white-image.png';
    vm.roles = user.roles;
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
  });
