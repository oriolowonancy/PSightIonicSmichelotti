(function () {

  TeamsCtrl.$inject = ['eliteApi'];

  angular.module('eliteApp').controller('TeamsCtrl', TeamsCtrl);

  function TeamsCtrl(eliteApi) {

    var vm = this;

    eliteApi.getLeaguesData().then(function (data) {
      vm.teams = data.teams;
      console.log('vm.teams: ', vm.teams);
    });
  }
}());
