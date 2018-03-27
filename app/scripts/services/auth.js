'use strict';

/**
 * @ngdoc service
 * @name certGeneratorWebApp.Auth
 * @description
 * # Auth
 * Service in the certGeneratorWebApp.
 */
angular.module('annClientApp')
  .factory('Auth', ['$http', '$q', '$location', '$rootScope', 'User', function ($http, $q, $location, $rootScope, User) {

    //var baseUrl = 'http://ncas.nigerianbar.org.ng/api';
    var baseUrl = 'http://localhost:8080';
    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user) {
        var deferred = $q.defer();

        var obj = {
          username: user.username,
          password: user.password,
          grant_type: 'password'
        };
        Object.toparams = function ObjectsToParams(obj) {
          var p = [];
          for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
          }
          return p.join('&');
        };

        $http({
          method: 'post',
          url: baseUrl + '/ums/auth',
          data: Object.toparams(obj),
          headers: { 'Content-type': 'application/x-www-form-urlencoded' }

        }).then(function (res) {
          var tempUser = {
            access_token: res.data.token
          }
          User.setCurrentUser(tempUser);
          $http.get(baseUrl + '/ums/users/me')
            .then(userRes => {
              var user = userRes.data;
              user.access_token = res.data.token;
              User.setCurrentUser(user);
              deferred.resolve(user);
            })
            .catch(err => deferred.reject(err.data));
        }, function (err) {
          deferred.reject(err.data);
        });

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function logout() {
        User.currentUser = null;
        User.setCurrentUser(User.currentUser);
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return User.currentUser.hasOwnProperty('roles');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function (cb) {
        if (User.currentUser.hasOwnProperty('$promise')) {
          User.currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        }
        else if (User.currentUser.hasOwnProperty('roles')) {
          cb(true);
        }
        else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function () {
        return User.currentUser.isAdmin;
      },

      /**
       * Get auth token
       */
      getToken: function () {
        return angular.fromJson(sessionStorage.token);
      },

      /**
       * Set auth token
       */
      setToken: function (token) {
        var t = token;
        sessionStorage.token = angular.toJson(t);
      }
    };
  }]);
