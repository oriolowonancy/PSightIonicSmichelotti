(function () {

  LeaguesCtrl.$inject = ["$state", "eliteApi", "$log"];
  angular.module('eliteApp').controller('LeaguesCtrl', LeaguesCtrl);

  function LeaguesCtrl($state, eliteApi, $log) {
    var vm = this;
    var leagues = eliteApi.getLeagues();

    vm.leagues = leagues;

    vm.selectLeague = function (leagueId) {
      $state.go('app.teams');
    };
  }
}());
