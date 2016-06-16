'use strict';

angular.module('smokerApp.temperature')
  .controller('TemperatureCtrl', function ($scope, $http, lodash) {

    var init = function () {
      $http.get('api/tempratures')
        .then(response => {
          $scope.temperatures = response.data;
          $scope.socket.syncUpdates('temperature', $scope.temperatures);
        })
    };

    $scope.getProbes = function () {

    };



    init();
  }]);
