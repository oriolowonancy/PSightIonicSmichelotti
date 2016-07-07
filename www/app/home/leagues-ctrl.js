(function () {

  LeaguesCtrl.$inject = ['$state', 'eliteApi', '$log'];
  angular.module('eliteApp').controller('LeaguesCtrl', LeaguesCtrl);

  function LeaguesCtrl($state, eliteApi, $log) {

    var vm = this;

    eliteApi.getLeagues().then(function (data) {
      
      vm.leagues = data;
    });

    vm.selectLeague = function (leagueId) {
      eliteApi.setLeagueId(leagueId);
      $state.go('app.teams');
    };
  }
}());
