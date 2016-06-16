'use strict';

angular.module('smokerApp', ['smokerApp.temperature', 'smokerApp.auth', 'smokerApp.admin',
                             'smokerApp.constants', 'ngLodash', 'ngCookies', 'ngResource',
                             'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
                             'validation.match'
  ])
  .config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
