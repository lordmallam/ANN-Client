'use strict';

/**
 * @ngdoc function
 * @name annClientApp.controller:NewMemberCtrl
 * @description
 * # NewMemberCtrl
 * Controller of the annClientApp
 */
angular.module('annClientApp')
  .controller('NewMemberCtrl', function ($routeParams, $location, Api, Shared, toastr, User) {
    const vm = this;
    vm.isUser = User.getCurrentUser() && User.getCurrentUser().member;
    vm.states = [];
    vm.lgas = [];
    vm.member = {};
    vm.member.dateOfBirth = '';
    vm.member.photo = null;
    vm.member.nok = {};
    vm.src = null;
    vm.photofile = null;
    vm.initialDOB = null;
    Api.all('states')
      .then(res => { 
        vm.states = res.map(state => (state.doc))
       })
      .catch(err => {
        console.log(err)
        toastr.error(err.data && err.data.message, err.data && err.data.error)
      });
    Api.all('lgas')
      .then(res => {
        vm.lgas = _.groupBy(res.map(lga => (lga.doc)), 'state');
        if (vm.member.state) {
          vm.getLGAs()
        }
      });

    vm.getLGAs = () => {
      vm.lgaByState = _.sortBy(vm.lgas[vm.member.state], 'name');
    };

    vm.moveToKin = (e) => {
      if (isInfoDataValid()) {
        const getImageResize = Shared.handleImageConversion(vm.member.photo, 200, 200, 0);
        getImageResize.then(function (imgArray) {
          vm.member.photo = imgArray;
        }).catch(function (reject) {
          e.stopPropagation();
          toastr.error(reject.data.Message, 'Photo Error');
        });
        angular.element('#kinTab').addClass('active');
        angular.element('#infoTab').removeClass('active');
        angular.element('#infoTabDiv').hide();
        angular.element('#kinTabDiv').show();
      } else {
        vm.errorfields = 'Provide values to these fields ' + vm.errorfields;
        toastr.warning(vm.errorfields, 'Invalid form');
        e.stopPropagation();
      }      
    };

    vm.register = (e) => {
      if (isNokValid()) {
        if (isInfoDataValid()) {
          vm.member._attachments = {
            'profile-pic.png': {
              content_type: 'image/png',
              data: vm.member.photo
            }
          }
          vm.member = _.omit(vm.member, ['photo', 'photoFile'])
          vm.member.password = 'annP'
          // Add new record to prospective
          Api.add('prospects', vm.member)
          .then(res => {
            $location.path('/member/submit');
          })
          .catch(err => {
            console.log(err);
            toastr.error(err.data && err.data.message, 'Error');
          });
          
        } else {
          vm.errorfields = 'Provide values to these fields ' + vm.errorfields;
          toastr.warning(vm.errorfields, 'Invalid form');
          angular.element('#infoTabDiv').show();
          angular.element('#kinTabDiv').hide();
          angular.element('#kinTab').removeClass('active');
          angular.element('#infoTab').addClass('active');
        }
      } else {
        vm.errorfields = 'Provide values to these fields ' + vm.errorfields;
        toastr.warning(vm.errorfields, 'Invalid form');
      }
    };

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
      console.log(vm.member.photo)
      if (Shared.isEmpty(vm.member.photo)) {
        vm.errorfields += ', Photo';
        result = false;
      }

      return result;
    };

    const isNokValid = () => {
      vm.errorfields = '';
      let result = true;
      if (Shared.isEmpty(vm.member.nok.firstname)) {
        vm.errorfields += 'First Name';
        result = false;
      }
      if (Shared.isEmpty(vm.member.nok.surname)) {
        vm.errorfields += ', Surname';
        result = false;
      }
      if (Shared.isEmpty(vm.member.nok.dateOfBirth)) {
        vm.errorfields += ', Date of Birth';
        result = false;
      }
      if (Shared.isEmpty(vm.member.nok.sex)) {
        vm.errorfields += ', Sex';
        result = false;
      }
      if (Shared.isEmpty(vm.member.nok.phone)) {
        vm.errorfields += ', Phone Number';
        result = false;
      }
      if (Shared.isEmpty(vm.member.nok.state)) {
        vm.errorfields += ', State';
        result = false;
      }
      return result;
    };
  });
