(function () {
  'use strict';

  TeamDetailCtrl.$inject = ["$stateParams", "$log"];
  angular.module('eliteApp').controller('MainDetailCtrl', TeamDetailCtrl);

  function TeamDetailCtrl($stateParams, $log) {
    var vm = this;

    $log.debug('invoked teamDetailCtrl', $stateParams);
  }

}());
