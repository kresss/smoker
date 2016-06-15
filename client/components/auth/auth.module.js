'use strict';

angular.module('smokerApp.auth', ['smokerApp.constants', 'smokerApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
