(function () {

  TeamsCtrl.$inject = ["eliteApi"];

  angular.module('eliteApp').controller('TeamsCtrl', TeamsCtrl);

  function TeamsCtrl(eliteApi) {

    var vm = this;
    vm.teams = eliteApi.getLeaguesData().teams;
  }



}());
