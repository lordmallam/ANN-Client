'use strict';

/**
 * @ngdoc service
 * @name certGeneratorWebApp.shared
 * @description
 * # shared
 * Service in the certGeneratorWebApp.
 */
angular.module('annClientApp')
  .service('Shared', function ($q, Api) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    let registeringUser = null;
    let States = [];
    let LGAs = [];

    let submitParams = {
      header: '',
      body: '',
      loginButton: false
    }

    const isUndefinedOrNull = value => (angular.isUndefined(value) || value === '' || value === ' ' || value === '  ');

    const toCamelCase = str => {
      var f = str.toLowerCase();
      var x = f.replace(/\b\w/g, function (l) { return l.toUpperCase() });
      return x;
    };

    const capitalize = str => (str.charAt(0).toUpperCase() + str.toLowerCase().slice(1));

    const isValidEmail = email => {
      if (isUndefinedOrNull(email)) {
        return false;
      }
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
    };

    const setRegisteringUser = user => {
      registeringUser = user;
    };

    const getRegisteringUser = user => (registeringUser);

    const setSubmitParams = (header='', body='', loginButton=false) => {
      submitParams = {
        header,
        body,
        loginButton
      }
    }

    const getSubmitParams = () => (submitParams)

    const setStates = states => {
      States = states;
    };

    const getStates = () => (new Promise((resolve, reject) => {
      if (!States.length) {
        Api.all('states')
          .then(res => {
            const s = res.map(rec => (rec.doc))
            setStates(s)
            resolve(s)
          })
          .catch(err => reject(States))
      } else {
        resolve(States)
      }
   }));

    const setLGAs = lgas => {
      LGAs = lgas;
    };

    const getLGAs = () => (new Promise((resolve, reject) => {
      if (!LGAs.length) {
        Api.all('lgas')
          .then(res => {
            const s = res.map(rec => (rec.doc))
            setLGAs(s)
            resolve(s)
          })
          .catch(err => reject(LGAs))
      } else {
        resolve(LGAs)
      }
    }));

    const getUserFriendlyRoles = roles => {
      var Uroles = [];
      if (roles.length) {
        if (roles.includes('ums_role_member')) {
          Uroles.push('Member');
        }
        if (roles.includes('ums_role_admin')) {
          Uroles.push('Admin');
        }
        if (roles.includes('ums_role_superAdmin')) {
          Uroles.push('Super Admin');
        }
        if (roles.includes('ums_role_agent')) {
          Uroles.push('Agent');
        }
      }
      return Uroles;
    };

    function byteToImage(byte) {

      function split(b) {
        var dataCheck = b.split(',');
        if (dataCheck.length === 1) {
          return 'data:image/png;base64,' + b;
        } else {
          return byte;
        }
      }
      return byte === null ? null : split(byte);
    }

    function resizeImage(img, maxWidth, maxHeight, degrees) {
      var imgWidth = img.width;
      var imgHeight = img.height;

      var ratio = 1,
        ratio1 = 1,
        ratio2 = 1;
      ratio1 = maxWidth / imgWidth;
      ratio2 = maxHeight / imgHeight;

      // Use the smallest ratio that the image best fit into the maxWidth x maxHeight box.
      if (ratio1 < ratio2) {
        ratio = ratio1;
      } else {
        ratio = ratio2;
      }
      var canvas = document.createElement("canvas");
      var canvasContext = canvas.getContext("2d");
      var canvasCopy = document.createElement("canvas");
      var copyContext = canvasCopy.getContext("2d");
      var canvasCopy2 = document.createElement("canvas");
      var copyContext2 = canvasCopy2.getContext("2d");
      canvasCopy.width = imgWidth;
      canvasCopy.height = imgHeight;
      copyContext.drawImage(img, 0, 0);

      // init
      canvasCopy2.width = imgWidth;
      canvasCopy2.height = imgHeight;
      copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);


      var rounds = 1;
      var roundRatio = ratio * rounds;
      for (var i = 1; i <= rounds; i++) {


        // tmp
        canvasCopy.width = imgWidth * roundRatio / i;
        canvasCopy.height = imgHeight * roundRatio / i;

        copyContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvasCopy.width, canvasCopy.height);

        // copy back
        canvasCopy2.width = imgWidth * roundRatio / i;
        canvasCopy2.height = imgHeight * roundRatio / i;
        copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);

      } // end for

      canvas.width = imgWidth * roundRatio / rounds;
      canvas.height = imgHeight * roundRatio / rounds;
      canvasContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvas.width, canvas.height);


      if (degrees === 90 || degrees === 270) {
        canvas.width = canvasCopy2.height;
        canvas.height = canvasCopy2.width;
      } else {
        canvas.width = canvasCopy2.width;
        canvas.height = canvasCopy2.height;
      }

      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      if (degrees === 90 || degrees === 270) {
        canvasContext.translate(canvasCopy2.height / 2, canvasCopy2.width / 2);
      } else {
        canvasContext.translate(canvasCopy2.width / 2, canvasCopy2.height / 2);
      }
      canvasContext.rotate(degrees * Math.PI / 180);
      canvasContext.drawImage(canvasCopy2, -canvasCopy2.width / 2, -canvasCopy2.height / 2);


      var dataURL = canvas.toDataURL();
      return dataURL;
    }

    function handleImageConversion(imgString, width, height, rotate) {
      var deffered = $q.defer();
      var img = new Image();
      try {
        img.src = URL.createObjectURL(imgString);
      } catch (e) {
        img.src = byteToImage(imgString);
      }

      img.onload = function () {
        var base64String = resizeImage(img, width, height, rotate);
        var dataCheck = base64String.split(',');
        if (dataCheck.length <= 1) {
          deffered.resolve(base64String);
        } else {
          deffered.resolve(dataCheck[1]);
        }
      };
      img.onerror = function () {
        deffered.reject('error loading resized image');
      };
      return deffered.promise;
    }

    return {
      isEmpty: isUndefinedOrNull,
      toCamelCase,
      capitalize,
      isValidEmail,
      setRegisteringUser,
      getRegisteringUser,
      getUserFriendlyRoles,
      handleImageConversion,
      byteToImage,
      setStates,
      getStates,
      setLGAs,
      getLGAs,
      getSubmitParams,
      setSubmitParams
    };

  });
