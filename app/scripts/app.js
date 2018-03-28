'use strict';

/**
 * @ngdoc overview
 * @name annClientApp
 * @description
 * # annClientApp
 *
 * Main module of the application.
 */
angular
  .module('annClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toastr',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider, $qProvider, $httpProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $qProvider.errorOnUnhandledRejections(false);

    var interceptor = function (User, $q, $location) {
      return {
        request: function (config) {
          var currentUser = User.getCurrentUser();
          if (currentUser !== null) {
            config.headers['Authorization'] = 'Bearer ' + currentUser.access_token;
          }
          return config;
        },
        responseError: function (rejection) {
          if (rejection.status === 401) {
            $location.path('/login');
            return $q.reject(rejection);
          }
          //TODO: handle unauthorized requests
          if (rejection.status === 403) {
            //$location.path('/login');
            return $q.reject(rejection);
          }

          return $q.reject(rejection);
        }
      };
    };

    var params = ['User', '$q', '$location'];
    interceptor.$inject = params;
    $httpProvider.interceptors.push(interceptor);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/handler/registration', {
        templateUrl: 'views/handler.registration.html',
        controller: 'HandlerRegCtrl',
        controllerAs: 'handlerReg'
      })
      .when('/confirmation/:ac', {
        templateUrl: 'views/confirmation.html',
        controller: 'ConfirmationCtrl',
        controllerAs: 'confirmation'
      })
      .when('/confirmation/:ac/:id', {
        templateUrl: 'views/confirmation.html',
        controller: 'ConfirmationCtrl',
        controllerAs: 'confirmation'
      })
      .when('/submit', {
        templateUrl: 'views/submit.html',
        controller: 'SubmitCtrl',
        controllerAs: 'submit'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/confirmation/:ac/xyz/mobile', {
        templateUrl: 'views/mobile.html',
        controller: 'MobileCtrl',
        controllerAs: 'mobile'
      })
      .when('/member-list', {
        templateUrl: 'views/member-list.html',
        controller: 'MemberListCtrl',
        controllerAs: 'memberList'
      })
      .when('/agent-registrations', {
        templateUrl: 'views/agent-registrations.html',
        controller: 'AgentRegistrationsCtrl',
        controllerAs: 'agentRegistrations'
      })
      .when('/manage-agents', {
        templateUrl: 'views/manage-agents.html',
        controller: 'ManageAgentsCtrl',
        controllerAs: 'manageAgents'
      })
      .when('/new-agent', {
        templateUrl: 'views/new-agent.html',
        controller: 'NewAgentCtrl',
        controllerAs: 'newAgent'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
